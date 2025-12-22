import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlucoseLibreConfig } from '../../../../config/glucose-libre.config';

export class GlucoseLibreAuthService {
  private readonly logger = new Logger(GlucoseLibreAuthService.name);
  constructor(
    private readonly config: GlucoseLibreConfig,
    private readonly httpService: HttpService,
  ) {}

  private async fetchAuthToken() {}

  async getAuthToken(regenerateToken: boolean) {}
}
