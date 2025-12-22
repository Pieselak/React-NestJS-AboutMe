import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlucoseDexcomConfig } from '../../../../config/glucose-dexcom.config';

@Injectable()
export class GlucoseDexcomService {
  private readonly logger = new Logger(GlucoseDexcomService.name);
  private initFail = false;
  constructor(
    private readonly config: GlucoseDexcomConfig,
    private readonly httpService: HttpService,
  ) {}

  async init() {
    try {
      if (!this.config.apiUrl) {
        throw new Error('DEXCOM_API_URL env is not configured.');
      }
      if (!this.config.apiVersion) {
        throw new Error('DEXCOM_API_VERSION env is not configured.');
      }
      if (!this.config.clientId) {
        throw new Error('DEXCOM_CLIENT_ID env is not configured.');
      }
      if (!this.config.clientSecret) {
        throw new Error('DEXCOM_CLIENT_SECRET env is not configured.');
      }
      if (!this.config.redirectUri) {
        throw new Error('DEXCOM_REDIRECT_URI env is not configured.');
      }
      await this.scheduleGlucoseFetch();
    } catch (error) {
      this.initFail = true;
      this.logger.error(error.message);
    }
  }

  isAvailable(): boolean {
    return this.initFail;
  }

  async scheduleGlucoseFetch() {
    console.log('GlucoseLibreService scheduleGlucoseFetch');
  }

  async getCurrentGlucose() {
    setTimeout(function () {
      return 'Current glucose data from Dexcom';
    }, 2000);
  }

  async getGraphData() {
    setTimeout(function () {
      return 'Glucose graph data from Dexcom';
    }, 2000);
  }

  async getSensorData() {
    setTimeout(function () {
      return 'Glucose sensor data from Dexcom';
    }, 2000);
  }
}
