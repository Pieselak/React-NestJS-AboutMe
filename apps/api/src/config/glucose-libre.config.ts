import { requireEnv } from '../helpers/env';
import { Injectable } from '@nestjs/common';
import { validateConfig } from '../helpers/config';

@Injectable()
export class GlucoseLibreConfig {
  readonly apiUrl: string;
  readonly version: string;
  readonly product: string;
  readonly accountId: string;
  readonly email: string;
  readonly password: string;

  constructor() {
    this.apiUrl = requireEnv('LIBRE_API_URL');
    this.version = requireEnv('LIBRE_VERSION');
    this.product = requireEnv('LIBRE_PRODUCT');
    this.accountId = requireEnv('LIBRE_ACCOUNT_ID');
    this.email = requireEnv('LIBRE_EMAIL');
    this.password = requireEnv('LIBRE_PASSWORD');
  }

  ensureValid(): void {
    validateConfig(this.apiUrl, 'LIBRE_API_URL');
    validateConfig(this.version, 'LIBRE_VERSION');
    validateConfig(this.product, 'LIBRE_PRODUCT');
    validateConfig(this.accountId, 'LIBRE_ACCOUNT_ID');
    validateConfig(this.email, 'LIBRE_EMAIL');
    validateConfig(this.password, 'LIBRE_PASSWORD');
  }
}
