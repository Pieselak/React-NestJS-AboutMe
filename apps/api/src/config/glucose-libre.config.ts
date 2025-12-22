import { requireEnv } from '../utils/env';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GlucoseLibreConfig {
  readonly apiUrl: string;
  readonly version: string;
  readonly product: string;
  readonly accountId: string;
  readonly email: string;
  readonly password: string;

  constructor() {
    this.apiUrl = requireEnv('LIBRE_API_URL', true);
    this.version = requireEnv('LIBRE_VERSION', true);
    this.product = requireEnv('LIBRE_PRODUCT', true);
    this.accountId = requireEnv('LIBRE_ACCOUNT_ID', true);
    this.email = requireEnv('LIBRE_EMAIL', true);
    this.password = requireEnv('LIBRE_PASSWORD', true);
  }
}
