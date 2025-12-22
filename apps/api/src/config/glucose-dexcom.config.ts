import { requireEnv } from '../utils/env';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GlucoseDexcomConfig {
  readonly apiUrl: string;
  readonly apiVersion: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly redirectUri: string;

  constructor() {
    this.apiUrl = requireEnv('DEXCOM_API_URL', true);
    this.apiVersion = requireEnv('DEXCOM_API_VERSION', true);
    this.clientId = requireEnv('DEXCOM_CLIENT_ID', true);
    this.clientSecret = requireEnv('DEXCOM_CLIENT_SECRET', true);
    this.redirectUri = requireEnv('DEXCOM_REDIRECT_URI', true);
  }
}
