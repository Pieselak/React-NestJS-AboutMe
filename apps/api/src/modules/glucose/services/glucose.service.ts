import {
  Injectable,
  Logger,
  NotImplementedException,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { GlucoseConfig } from '../../../config/glucose.config';
import { GlucoseLibreService } from './libre/libre.service';
import { GlucoseDexcomService } from './dexcom/dexcom.service';
import { GetCurrentGlucoseResponse } from '../dto/response/getCurrentGlucose.dto';
import { GetGraphDataResponse } from '../dto/response/getGraphData.dto';
import { GetSensorDataResponse } from '../dto/response/getSensorData.dto';
import { GetTimeInRangeResponse } from '../dto/response/getTimeInRange.dto';
import { GetAverageGlucoseResponse } from '../dto/response/getAverageGlucose.dto';
import { GetHighestGlucoseResponse } from '../dto/response/getHighestGlucose.dto';
import { GetLowestGlucoseResponse } from '../dto/response/getLowestGlucose.dto';
import { GetTimeInRangeQuery } from '../dto/input/getTimeInRange.dto';
import { GetAverageGlucoseQuery } from '../dto/input/getAverageGlucose.dto';
import { GlucoseRepository } from '../repositories/glucose.repository';
import { IGlucoseService } from '../glucose.types';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class GlucoseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(GlucoseService.name);
  private readonly glucoseServiceMap: Record<string, IGlucoseService> = {};

  private isAvailable = false;
  private selectedGlucoseService: IGlucoseService | null = null;

  constructor(
    private readonly config: GlucoseConfig,
    private readonly repository: GlucoseRepository,
    private readonly libreService: GlucoseLibreService,
    private readonly dexcomService: GlucoseDexcomService,
  ) {
    this.glucoseServiceMap['libre'] = this.libreService;
    this.glucoseServiceMap['dexcom'] = this.dexcomService;
  }

  async onModuleInit() {
    try {
      this.config.ensureValid();

      const providerConfig = this.config.sensorProvider;
      if (providerConfig === 'none') {
        this.isAvailable = false;
        this.logger.log('Glucose module is disabled by configuration.');
        return;
      } else if (this.glucoseServiceMap[providerConfig]) {
        this.selectedGlucoseService = this.glucoseServiceMap[providerConfig];
      } else {
        throw new ServiceUnavailableException('Invalid glucose provider.');
      }

      this.isAvailable = true;
      this.selectedGlucoseService.initialize();
      this.logger.log(
        `Glucose module initialized with provider: ${providerConfig}`,
      );
    } catch (error) {
      this.isAvailable = false;
      this.logger.error(error instanceof Error ? error.message : error);
    }
  }

  onModuleDestroy() {
    this.isAvailable = false;
    this.selectedGlucoseService = null;
  }

  private ensureAvailable(): void {
    if (!this.isAvailable || !this.selectedGlucoseService) {
      throw new ServiceUnavailableException(
        'Glucose service is not available.',
      );
    }
  }

  async getCurrentGlucose(): Promise<GetCurrentGlucoseResponse> {
    this.ensureAvailable();

    return this.selectedGlucoseService!.getCurrentGlucose();
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    this.ensureAvailable();

    return this.selectedGlucoseService!.getGraphData();
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    this.ensureAvailable();

    return this.selectedGlucoseService!.getSensorData();
  }

  async getTimeInRange(
    params: GetTimeInRangeQuery,
  ): Promise<GetTimeInRangeResponse> {
    this.ensureAvailable();

    const unit = await this.selectedGlucoseService!.getUnit();

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

    const unit = await this.selectedGlucoseService!.getUnit();

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

    const unit = await this.selectedGlucoseService!.getUnit();

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

    const unit = await this.selectedGlucoseService!.getUnit();

    return await this.repository.getLowestGlucose({
      unit: unit,
      hours: params.hours,
      provider: this.config.sensorProvider,
    });
  }
}
