import {
  Inject,
  Injectable,
  Logger,
  NotImplementedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlucoseDexcomConfig } from '../../../../config/glucose-dexcom.config';
import { GetCurrentGlucoseResponse } from '../../dto/response/getCurrentGlucose';
import { GetGraphDataResponse } from '../../dto/response/getGraphData';
import { GetSensorDataResponse } from '../../dto/response/getSensorData';
import { GlucoseData, IGlucoseService } from '../../glucose.types';
import { GlucoseDexcomAuthService } from './dexcomAuth.service';
import { GlucoseRepository } from '../../repositories/glucose.repository';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class GlucoseDexcomService implements IGlucoseService {
  private readonly logger = new Logger(GlucoseDexcomService.name);

  private initFail = false;
  private inFlight: Record<string, Promise<any> | null> = {};

  private glucoseFetchTimer: NodeJS.Timeout | null = null;
  private glucoseData: GlucoseData | null = null;
  private glucoseRefreshAt: number | null = null;

  constructor(
    private readonly config: GlucoseDexcomConfig,
    private readonly authService: GlucoseDexcomAuthService,
    private readonly httpService: HttpService,
    private readonly repository: GlucoseRepository,
    //private readonly transformer: GlucoseDexcomTransformer,
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
        'Glucose Dexcom service is not available.',
      );
    }
  }

  private async ensureFetched(): Promise<void> {
    if (!this.glucoseData) {
      //await this.fetchGlucose();
    }
  }

  private async scheduleFetchGlucose() {
    console.log('GlucoseLibreService scheduleGlucoseFetch');
  }

  async getUnit(): Promise<string> {
    this.ensureAvailable();
    return 'mg/dL';
  }

  async getCurrentGlucose(): Promise<GetCurrentGlucoseResponse> {
    this.ensureAvailable();
    throw new NotImplementedException();
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    this.ensureAvailable();
    throw new NotImplementedException();
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    this.ensureAvailable();
    throw new NotImplementedException();
  }
}
