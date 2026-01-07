import {
  Injectable,
  Logger,
  NotImplementedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlucoseDexcomConfig } from '../../../../config/glucose-dexcom.config';
import { IGlucoseService } from '../glucose.service';
import { GetCurrentGlucoseResponse } from '../../dto/response/getCurrentGlucose';
import { GetGraphDataResponse } from '../../dto/response/getGraphData';
import { GetSensorDataResponse } from '../../dto/response/getSensorData';

@Injectable()
export class GlucoseDexcomService implements IGlucoseService {
  private readonly logger = new Logger(GlucoseDexcomService.name);

  private initFail = false;
  private inFlight: Record<string, Promise<any> | null> = {};

  private dexcomData: {
    timestamp: number;
    unit: string;
    currentGlucose: GetCurrentGlucoseResponse;
    graphData: GetGraphDataResponse;
    sensorData: GetSensorDataResponse;
  };

  constructor(
    private readonly config: GlucoseDexcomConfig,
    private readonly httpService: HttpService,
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
