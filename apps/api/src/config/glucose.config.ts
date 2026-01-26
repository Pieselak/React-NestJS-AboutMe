import { requireEnv } from '../helpers/env';
import { Injectable } from '@nestjs/common';
import { validateConfig } from '../helpers/config';

@Injectable()
export class GlucoseConfig {
  readonly sensorProvider: string;

  constructor() {
    this.sensorProvider = requireEnv('GLUCOSE_SENSOR');
  }

  ensureValid(): void {
    validateConfig(this.sensorProvider, 'GLUCOSE_SENSOR');
  }
}
