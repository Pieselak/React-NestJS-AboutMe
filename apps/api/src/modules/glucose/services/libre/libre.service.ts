import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlucoseLibreConfig } from '../../../../config/glucose-libre.config';

@Injectable()
export class GlucoseLibreService {
  private readonly logger = new Logger(GlucoseLibreService.name);
  private initFail = false;
  constructor(
    private readonly libreConfig: GlucoseLibreConfig,
    private readonly httpService: HttpService,
  ) {}

  async init() {
    try {
      if (!this.libreConfig.apiUrl) {
        throw new Error('LIBRE_API_URL env is not configured.');
      }
      if (!this.libreConfig.version) {
        throw new Error('LIBRE_VERSION env is not configured.');
      }
      if (!this.libreConfig.product) {
        throw new Error('LIBRE_PRODUCT env is not configured.');
      }
      if (!this.libreConfig.accountId) {
        throw new Error('LIBRE_ACCOUNT_ID env is not configured.');
      }
      if (!this.libreConfig.email) {
        throw new Error('LIBRE_EMAIL env is not configured.');
      }
      if (!this.libreConfig.password) {
        throw new Error('LIBRE_PASSWORD env is not configured.');
      }
      await this.scheduleGlucoseFetch();
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  isAvailable(): boolean {
    return this.initFail;
  }

  private async fetchGlucoseData() {}

  async scheduleGlucoseFetch() {
    console.log('GlucoseLibreService scheduleGlucoseFetch');
  }

  async getCurrentGlucose() {
    return 'Current glucose data from Libre';
  }

  async getGraphData() {
    return 'Glucose graph data from Libre';
  }

  async getSensorData() {
    return 'Glucose sensor data from Libre';
  }
}
