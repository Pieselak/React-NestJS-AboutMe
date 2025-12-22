import {
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { FetchDataResponse } from './responses/getData';
import { GlucoseAuthService } from './glucose.auth.service';
import { GlucoseTransformer } from './glucose.transformer';
import { GlucoseConfig } from '../../config/glucose.config';
import { GLUCOSE_CONSTANTS } from '../../constants/glucose.constants';
import { GlucoseRepository } from './glucose.repository';
import { GetAverageResponse } from './responses/getAverage';
import { GetTimeInRangeOldResponse } from './responses/getTimeInRange';
import { GetAverageDto } from './dto/getAverage';
import { GetTimeInRangeDto } from './dto/getTimeInRange';

@Injectable()
export class GlucoseoldService {
  private readonly logger = new Logger(GlucoseoldService.name);
  private glucoseLastData: FetchDataResponse | null = null;
  private glucoseTimeout: NodeJS.Timeout | null = null;
  private glucoseRetryAfter: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly authService: GlucoseAuthService,
    private readonly repository: GlucoseRepository,
    private readonly config: GlucoseConfig,
  ) {}

  async onModuleInit() {
    this.scheduleFetchData();
  }

  private async fetchData(
    retryCount = 0,
    regenerateToken: boolean = false,
    test: boolean = false,
  ): Promise<FetchDataResponse> {
    if (test) {
      throw new ServiceUnavailableException();
    }
    try {
      this.logger.debug('Fetching LibreView glucose data');
      const { token, patientId } =
        await this.authService.fetchAuth(regenerateToken);

      const response = await lastValueFrom(
        this.httpService.get(
          `${this.config.apiUrl}/connections/${patientId}/graph`,
          {
            headers: {
              product: this.config.product,
              version: this.config.version,
              'account-id': this.config.accountId,
              Authorization: `Bearer ${token}`,
            },
            validateStatus: () => true,
          },
        ),
      );

      const data = response.data.data;
      if (response.status !== 200) {
        if (response.headers['retry-after']) {
          this.glucoseRetryAfter =
            Date.now() +
            Number(response.headers['retry-after']) *
              GLUCOSE_CONSTANTS.SEC_TO_MS;
          this.logger.warn(
            `LibreView API rate limit exceeded, retry after ${response.headers['retry-after']} seconds`,
          );
        }

        throw new Error(
          data.error?.message || response.status || 'unknown error',
        );
      }

      this.logger.debug('Fetched LibreView glucose data');
      const dataResponse = GlucoseTransformer.toFetchDataResponse(data);

      try {
        await this.repository.saveMeasurement({
          value: dataResponse.glucoseData.value,
          unit: dataResponse.glucoseData.unit,
          timestamp: dataResponse.glucoseData.timestamp,
        });
      } catch {
        this.logger.warn('Failed to save glucose data to repository');
      }

      return dataResponse;
    } catch (error) {
      if (error.message == 401 && retryCount === 0) {
        this.logger.debug('Invalid LibraView auth token, retrying');
        return this.fetchData(retryCount + 1, true);
      }
      throw new ServiceUnavailableException(
        `failed to fetch data (${error.message || error})`,
      );
    }
  }

  private async scheduleFetchData() {
    if (this.glucoseTimeout) {
      clearTimeout(this.glucoseTimeout);
    }

    let nextRefresh: number = GLUCOSE_CONSTANTS.GLUCOSE.DEFAULT_RETRY_MS;
    if (this.glucoseRetryAfter && this.glucoseRetryAfter > Date.now()) {
      throw new Error('Scheduling fetch data delayed due to rate limiting');
    } else {
      try {
        this.glucoseLastData = await this.fetchData();
        nextRefresh = Math.max(
          nextRefresh,
          this.glucoseLastData.nextRefresh - Date.now(),
        );
      } catch (error) {
        this.logger.error('Scheduling fetch data failed:', error);
      }
    }

    this.glucoseTimeout = setTimeout(
      () => this.scheduleFetchData(),
      nextRefresh,
    );
  }

  async getData(): Promise<FetchDataResponse> {
    if (this.glucoseLastData) {
      this.logger.debug('Returning cached LibraView glucose data');
      return this.glucoseLastData;
    }
    return this.fetchData();
  }

  async getAverage(params: GetAverageDto): Promise<GetAverageResponse> {
    const glucoseData = this.glucoseLastData || (await this.fetchData());
    if (!glucoseData) {
      throw new Error('glucoseData not found');
    }

    try {
      const result = await this.repository.getAverage(
        glucoseData.glucoseData.unit,
        params.hours,
      );
      if (result === null) {
        throw new Error('database returned null');
      }
      result.hours = params.hours || undefined;
      return result;
    } catch (error) {
      this.logger.error(
        'Failed to get average glucose from repository:',
        error,
      );
      throw new InternalServerErrorException('Failed to get average glucose');
    }
  }

  async getTimeInRange(
    params: GetTimeInRangeDto,
  ): Promise<GetTimeInRangeOldResponse> {
    const glucoseData = this.glucoseLastData || (await this.fetchData());
    if (!glucoseData) {
      throw new Error('glucoseData not found');
    }

    try {
      const result = await this.repository.getTimeInRange(
        glucoseData.graphData.targetLow,
        glucoseData.graphData.targetHigh,
        glucoseData.graphData.fixedLow,
        glucoseData.graphData.fixedHigh,
        glucoseData.glucoseData.unit,
        params.hours,
      );
      if (result === null) {
        throw new Error('database returned null');
      }
      result.hours = params.hours || undefined;
      return result;
    } catch (error) {
      this.logger.error('Failed to get time in range from repository:', error);
      throw new InternalServerErrorException('Failed to get time in range');
    }
  }
}
