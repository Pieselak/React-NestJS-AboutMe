import { requireEnv } from '../helpers/env';
import { Injectable } from '@nestjs/common';
import { validateConfig } from '../helpers/config';

@Injectable()
export class GlucoseDexcomConfig {
  readonly apiUrl: string;
  readonly apiVersion: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly redirectUri: string;

  constructor() {
    this.apiUrl = requireEnv('DEXCOM_API_URL');
    this.apiVersion = requireEnv('DEXCOM_API_VERSION');
    this.clientId = requireEnv('DEXCOM_CLIENT_ID');
    this.clientSecret = requireEnv('DEXCOM_CLIENT_SECRET');
    this.redirectUri = requireEnv('DEXCOM_REDIRECT_URI');
  }

  ensureValid(): void {
    validateConfig(this.apiUrl, 'DEXCOM_API_URL');
    validateConfig(this.apiVersion, 'DEXCOM_API_VERSION');
    validateConfig(this.clientId, 'DEXCOM_CLIENT_ID');
    validateConfig(this.clientSecret, 'DEXCOM_CLIENT_SECRET');
    validateConfig(this.redirectUri, 'DEXCOM_REDIRECT_URI');
  }
}
