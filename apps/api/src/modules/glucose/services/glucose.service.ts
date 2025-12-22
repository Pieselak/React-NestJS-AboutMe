import {
  Injectable,
  Logger,
  NotImplementedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { GlucoseConfig } from '../../../config/glucose.config';
import { GlucoseLibreService } from './libre/libre.service';
import { GlucoseDexcomService } from './dexcom/dexcom.service';
import { GetCurrentGlucoseResponse } from '../dto/response/getCurrentGlucose';
import { GetGraphDataResponse } from '../dto/response/getGraphData';
import { GetSensorDataResponse } from '../dto/response/getSensorData';
import { GetTimeInRangeResponse } from '../dto/response/getTimeInRange';
import { GetAverageGlucoseResponse } from '../dto/response/getAverageGlucose';
import { GetHighestGlucoseResponse } from '../dto/response/GetHighestGlucose';
import { GetLowestGlucoseResponse } from '../dto/response/GetLowestGlucose';
import { GetTimeInRangeInput } from '../dto/input/getTimeInRange';
import { GetAverageGlucoseInput } from '../dto/input/getAverageGlucose';

@Injectable()
export class GlucoseService {
  private readonly logger = new Logger(GlucoseService.name);
  private readonly serviceByProvider: Record<
    string,
    GlucoseLibreService | GlucoseDexcomService
  >;

  constructor(
    private readonly config: GlucoseConfig,
    private readonly libreService: GlucoseLibreService,
    private readonly dexcomService: GlucoseDexcomService,
  ) {
    this.serviceByProvider = {
      libre: this.libreService,
      dexcom: this.dexcomService,
    };
  }

  private checkAvailability() {
    if (!this.serviceByProvider[this.config.sensorProvider].isAvailable()) {
      throw new ServiceUnavailableException('Sensor service is not available.');
    }
  }

  async onModuleInit() {
    try {
      if (!this.config.sensorProvider) {
        throw new Error('Sensor provider is not configured.');
      }
      if (!this.serviceByProvider[this.config.sensorProvider]) {
        throw new Error('Invalid sensor provider configured.');
      }
      await this.serviceByProvider[this.config.sensorProvider].init();
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getCurrentGlucose(): Promise<GetCurrentGlucoseResponse> {
    this.checkAvailability();
    throw new NotImplementedException();
    // return this.serviceByProvider[
    //   this.config.sensorProvider
    // ].getCurrentGlucose();
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    this.checkAvailability();
    throw new NotImplementedException();
    // return this.serviceByProvider[this.config.sensorProvider].getGraphData();
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    this.checkAvailability();
    throw new NotImplementedException();
    // return this.serviceByProvider[this.config.sensorProvider].getSensorData();
  }

  async getTimeInRange(
    params: GetTimeInRangeInput,
  ): Promise<GetTimeInRangeResponse> {
    this.checkAvailability();
    throw new NotImplementedException();
  }

  async getAverageGlucose(
    params: GetAverageGlucoseInput,
  ): Promise<GetAverageGlucoseResponse> {
    this.checkAvailability();
    throw new NotImplementedException();
  }

  async getHighestGlucose(): Promise<GetHighestGlucoseResponse> {
    this.checkAvailability();
    throw new NotImplementedException();
  }

  async getLowestGlucose(): Promise<GetLowestGlucoseResponse> {
    this.checkAvailability();
    throw new NotImplementedException();
  }
}
