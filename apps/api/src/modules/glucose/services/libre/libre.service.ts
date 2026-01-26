import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ThrottlerException } from '@nestjs/throttler';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { clearTimeout } from 'node:timers';
import { GlucoseProviders } from '../../glucose.enum';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';
import { GlucoseLibreConfig } from '../../../../config/glucose-libre.config';
import { GetCurrentGlucoseResponse } from '../../dto/response/getCurrentGlucose';
import { GetGraphDataResponse } from '../../dto/response/getGraphData';
import { GetSensorDataResponse } from '../../dto/response/getSensorData';
import { GlucoseLibreAuthService } from './libreAuth.service';
import { GlucoseRepository } from '../../repositories/glucose.repository';
import { GlucoseLibreTransformer } from './libre.transformer';
import { GlucoseData, IGlucoseService } from '../../glucose.types';

interface LibreAPIGlucoseFormat {
  FactoryTimestamp: string;
  MeasurementColor: number;
  GlucoseUnits: number;
  Value: number;
  isHigh: boolean;
  isLow: boolean;
}

interface LibreAPIGlucoseMeasurement extends LibreAPIGlucoseFormat {
  TrendArrow: number;
}

interface LibreAPISensorFormat {
  sensor: {
    a: number;
  };
}

export interface LibreAPIResponse {
  connection: {
    targetLow: number;
    targetHigh: number;
    alarmRules: {
      h: {
        th: number;
      };
      l: {
        th: number;
      };
    };
    glucoseMeasurement: LibreAPIGlucoseMeasurement;
    patientDevice: {
      ll: number;
      hl: number;
    };
  };
  activeSensors: LibreAPISensorFormat[];
  graphData: LibreAPIGlucoseFormat[];
}

@Injectable()
export class GlucoseLibreService implements IGlucoseService {
  private readonly logger = new Logger(GlucoseLibreService.name);

  private initFail = false;
  private inFlight: Record<string, Promise<any> | null> = {};

  private glucoseFetchTimeout: NodeJS.Timeout | null = null;
  private glucoseData: GlucoseData | null = null;
  private glucoseRefreshAt: number | null = null;

  constructor(
    private readonly config: GlucoseLibreConfig,
    private readonly authService: GlucoseLibreAuthService,
    private readonly httpService: HttpService,
    private readonly repository: GlucoseRepository,
    private readonly transformer: GlucoseLibreTransformer,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async init() {
    try {
      this.config.ensureValid();
      await this.scheduleFetchGlucose();
    } catch (error) {
      this.initFail = true;
      this.logger.error(error instanceof Error ? error.message : error);
    }
  }

  private ensureAvailable(): void {
    if (this.initFail) {
      throw new ServiceUnavailableException(
        'Glucose Libre service is not available.',
      );
    }
  }

  private async ensureFetched(): Promise<void> {
    if (!this.glucoseData) {
      await this.fetchGlucose();
    }
  }

  private getRefreshAt(): number {
    return this.glucoseRefreshAt ?? 0;
  }

  private getRefreshIn(): number {
    return Math.max(0, this.getRefreshAt() - Date.now());
  }

  private async scheduleFetchGlucose() {
    if (this.glucoseFetchTimeout) {
      clearTimeout(this.glucoseFetchTimeout);
    }

    const currentTimestamp = Date.now();
    const rateLimit = await this.cacheManager.get<number>(
      GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
    );
    this.glucoseRefreshAt =
      currentTimestamp + GLUCOSE_CONSTANTS.LIBRE.FETCH_TIMEOUT_MS;

    if (rateLimit) {
      this.glucoseRefreshAt =
        currentTimestamp +
        Math.max(GLUCOSE_CONSTANTS.LIBRE.RETRY_MS, rateLimit - Date.now());
    } else {
      try {
        await this.fetchGlucose();
        const refreshCandidate =
          (this.glucoseData?.currentGlucose.timestamp ?? 0) +
          GLUCOSE_CONSTANTS.LIBRE.FETCH_TIMEOUT_MS;

        if (
          this.glucoseData?.timestamp &&
          refreshCandidate > currentTimestamp
        ) {
          this.glucoseRefreshAt = refreshCandidate;
        }
      } catch (error) {
        this.glucoseRefreshAt =
          currentTimestamp + GLUCOSE_CONSTANTS.LIBRE.RETRY_MS;
      }
    }

    const refresh = this.glucoseRefreshAt! - currentTimestamp;
    this.glucoseFetchTimeout = setTimeout(
      () => this.scheduleFetchGlucose(),
      refresh,
    );
    this.logger.debug(`Next Libre glucose fetch scheduled in ${refresh} ms`);
  }

  private async handleResponse(
    response: AxiosResponse,
  ): Promise<LibreAPIResponse> {
    switch (response.status) {
      case 200:
        break;
      case 400:
        throw new BadRequestException('Invalid request.');
      case 429:
        const retryAfter: number =
          Number(response.headers['retry-after']) || 60;
        await this.cacheManager.set(
          GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
          Date.now() + retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
          retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
        );
        throw new ThrottlerException(
          `Rate limit exceeded, retry after ${retryAfter} seconds.`,
        );
      default:
        throw new ServiceUnavailableException('Libre endpoint is unavailable.');
    }

    const data = response.data.data;
    if (!data) {
      throw new ServiceUnavailableException('Invalid response from Libre.');
    }

    return data;
  }

  private async fetchGlucose() {
    const promise =
      this.inFlight[GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE];
    if (promise) {
      return await promise;
    }

    this.inFlight[GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE] =
      (async () => {
        try {
          const rateLimit = await this.cacheManager.get<number>(
            GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
          );
          if (rateLimit) {
            throw new ThrottlerException(
              `Rate limit exceeded, try in ${Math.max(0, rateLimit - Date.now())} seconds.`,
            );
          }
          const { token, patientId } = await this.authService.getToken();
          const response: AxiosResponse<LibreAPIResponse> = await lastValueFrom(
            this.httpService.get(
              `${this.config.apiUrl}/connections/${patientId}/graph`,
              {
                headers: {
                  Authorization: token,
                  product: this.config.product,
                  version: this.config.version,
                  'account-id': this.config.accountId,
                },
                validateStatus: () => true,
              },
            ),
          );

          const data = await this.handleResponse(response);
          this.glucoseData = this.transformer.transform(data);

          if (this.glucoseData?.currentGlucose) {
            await this.repository.saveGlucoseMeasurement({
              provider: GlucoseProviders.LIBRE,
              unit: this.glucoseData?.unit,
              value: this.glucoseData?.currentGlucose.value,
              timestamp: new Date(this.glucoseData?.currentGlucose.timestamp),
            });
          }
        } catch (error) {
          this.logger.error(`Libre error: ${error?.message ?? error}`);
          if (error instanceof HttpException) throw error;
          throw new ServiceUnavailableException(
            'Failed to fetch Libre data.',
            error,
          );
        } finally {
          this.inFlight[
            GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE
          ] = null;
        }
      })();

    return this.inFlight[
      GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE
    ];
  }

  async getUnit(): Promise<string> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.unit) {
      throw new ServiceUnavailableException(
        'Glucose unit data is not available.',
      );
    }

    return this.glucoseData.unit;
  }

  async getCurrentGlucose(): Promise<GetCurrentGlucoseResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.currentGlucose) {
      throw new ServiceUnavailableException(
        'Current glucose data is not available.',
      );
    }

    const response = this.glucoseData.currentGlucose;
    response.refreshAt = this.getRefreshAt();
    response.refreshIn = this.getRefreshIn();
    return response;
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.graphData) {
      throw new ServiceUnavailableException(
        'Graph glucose data is not available.',
      );
    }

    const response = this.glucoseData.graphData;
    response.refreshAt = this.getRefreshAt();
    response.refreshIn = this.getRefreshIn();
    return response;
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.sensorData) {
      throw new ServiceUnavailableException(
        'Sensor glucose data is not available.',
      );
    }

    return this.glucoseData.sensorData;
  }
}
