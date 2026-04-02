import {
  Inject,
  Injectable,
  Logger,
  NotImplementedException,
  OnModuleDestroy,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlucoseDexcomConfig } from '../../../../config/glucose-dexcom.config';
import { GetCurrentGlucoseResponse } from '../../dto/response/getCurrentGlucose.dto';
import { GetGraphDataResponse } from '../../dto/response/getGraphData.dto';
import { GetSensorDataResponse } from '../../dto/response/getSensorData.dto';
import { GlucoseData, IGlucoseService } from '../../glucose.types';
import { GlucoseDexcomAuthService } from './dexcomAuth.service';
import { GlucoseRepository } from '../../repositories/glucose.repository';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { clearTimeout } from 'node:timers';

@Injectable()
export class GlucoseDexcomService implements IGlucoseService, OnModuleDestroy {
  private readonly logger = new Logger(GlucoseDexcomService.name);

  private isAvailable = false;
  private inFlight: Promise<any> | null = null;

  private glucoseFetchTimeout: NodeJS.Timeout | null = null;
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

  initialize(): void {
    try {
      this.config.ensureValid();
      this.isAvailable = true;
      this.logger.log('Dexcom Glucose service is available.');
    } catch (error) {
      this.isAvailable = false;
      this.logger.error(error instanceof Error ? error.message : error);
      return;
    }

    this.scheduleFetchGlucose();
  }

  onModuleDestroy() {
    this.isAvailable = false;
    if (this.glucoseFetchTimeout) {
      clearTimeout(this.glucoseFetchTimeout);
    }
  }

  private ensureAvailable(): void {
    if (!this.isAvailable) {
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

  private getRefreshAt(): number {
    return this.glucoseRefreshAt ?? 0;
  }

  private getRefreshIn(): number {
    return Math.max(0, this.getRefreshAt() - Date.now());
  }

  private async scheduleFetchGlucose() {
    console.log('GlucoseLibreService scheduleGlucoseFetch');
  }

  async isSensorActive(): Promise<boolean> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.sensorData) {
      throw new ServiceUnavailableException('Sensor data is not available.');
    }

    return this.glucoseData.sensorData.isActive;
  }

  async getUnit(): Promise<string> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.unit) {
      throw new ServiceUnavailableException('Glucose unit is not available.');
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

    return this.glucoseData.currentGlucose;
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.graphData) {
      throw new ServiceUnavailableException(
        'Glucose graph data is not available.',
      );
    }

    return this.glucoseData.graphData;
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.sensorData) {
      throw new ServiceUnavailableException(
        'Glucose sensor data is not available.',
      );
    }

    return this.glucoseData.sensorData;
  }
}
