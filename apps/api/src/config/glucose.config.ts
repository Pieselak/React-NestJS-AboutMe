import { requireEnv } from '../helpers/env';
import { Injectable } from '@nestjs/common';
import { validateConfig } from '../helpers/config';

@Injectable()
export class GlucoseConfig {
  readonly sensorProvider: string;

  readonly apiUrl: string;
  readonly version: string;
  readonly product: string;
  readonly accountId: string;
  readonly email: string;
  readonly password: string;

  constructor() {
    this.sensorProvider = requireEnv('GLUCOSE_SENSOR');

    this.apiUrl = this.getEnv('LIBREVIEW_API_URL');
    this.version = this.getEnv('LIBREVIEW_VERSION');
    this.product = this.getEnv('LIBREVIEW_PRODUCT');
    this.accountId = this.getEnv('LIBREVIEW_ACCOUNT_ID');
    this.email = this.getEnv('LIBREVIEW_EMAIL');
    this.password = this.getEnv('LIBREVIEW_PASSWORD');
  }

  ensureValid(): void {
    validateConfig(this.sensorProvider, 'GLUCOSE_SENSOR');
  }

  private getEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
}
