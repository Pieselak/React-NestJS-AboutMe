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
import { GetHighestGlucoseResponse } from '../dto/response/getHighestGlucose';
import { GetLowestGlucoseResponse } from '../dto/response/getLowestGlucose';
import { GetTimeInRangeQuery } from '../dto/input/getTimeInRange';
import { GetAverageGlucoseQuery } from '../dto/input/getAverageGlucose';
import { GlucoseRepository } from '../repositories/glucose.repository';
import { IGlucoseService } from '../glucose.types';

@Injectable()
export class GlucoseService {
  private readonly logger = new Logger(GlucoseService.name);
  private readonly serviceByProvider: Record<string, IGlucoseService>;
  private initFail = false;

  constructor(
    private readonly config: GlucoseConfig,
    private readonly repository: GlucoseRepository,
    private readonly libreService: GlucoseLibreService,
    private readonly dexcomService: GlucoseDexcomService,
  ) {
    this.serviceByProvider = {
      libre: this.libreService,
      dexcom: this.dexcomService,
    };
  }

  async onModuleInit() {
    try {
      this.config.ensureValid();
      if (!this.serviceByProvider[this.config.sensorProvider]) {
        throw new Error('Invalid sensor provider configured.');
      }
      await this.serviceByProvider[this.config.sensorProvider].init();
    } catch (error) {
      this.initFail = true;
      this.logger.error(error instanceof Error ? error.message : error);
    }
  }

  private ensureAvailable(): void {
    if (this.initFail) {
      throw new ServiceUnavailableException(
        'Glucose service is not available.',
      );
    }
  }

  async getCurrentGlucose(): Promise<GetCurrentGlucoseResponse> {
    return this.serviceByProvider[
      this.config.sensorProvider
    ].getCurrentGlucose();
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    return this.serviceByProvider[this.config.sensorProvider].getGraphData();
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    return this.serviceByProvider[this.config.sensorProvider].getSensorData();
  }

  async getTimeInRange(
    params: GetTimeInRangeQuery,
  ): Promise<GetTimeInRangeResponse> {
    this.ensureAvailable();
    const unit =
      await this.serviceByProvider[this.config.sensorProvider].getUnit();

    return await this.repository.getTimeInRange({
      unit: unit,
      hours: params.hours,
      provider: this.config.sensorProvider,
      // Temporary hardcoded values until user-specific targets are implemented
      targetLow: 80,
      targetHigh: 180,
      levelLow: 70,
      levelHigh: 230,
    });
  }

  async getAverageGlucose(
    params: GetAverageGlucoseQuery,
  ): Promise<GetAverageGlucoseResponse> {
    this.ensureAvailable();
    const unit =
      await this.serviceByProvider[this.config.sensorProvider].getUnit();

    return await this.repository.getAverageGlucose({
      unit: unit,
      hours: params.hours,
      provider: this.config.sensorProvider,
    });
  }

  async getHighestGlucose(
    params: GetAverageGlucoseQuery,
  ): Promise<GetHighestGlucoseResponse> {
    this.ensureAvailable();
    const unit =
      await this.serviceByProvider[this.config.sensorProvider].getUnit();

    return await this.repository.getHighestGlucose({
      unit: unit,
      hours: params.hours,
      provider: this.config.sensorProvider,
    });
  }

  async getLowestGlucose(
    params: GetAverageGlucoseQuery,
  ): Promise<GetLowestGlucoseResponse> {
    this.ensureAvailable();
    const unit =
      await this.serviceByProvider[this.config.sensorProvider].getUnit();

    return await this.repository.getLowestGlucose({
      unit: unit,
      hours: params.hours,
      provider: this.config.sensorProvider,
    });
  }
}
