import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { FetchAuthResponse } from './responses/fetchAuth';
import { GlucoseConfig } from '../../config/glucose.config';
import { GLUCOSE_CONSTANTS } from '../../constants/glucose.constants';

@Injectable()
export class GlucoseAuthService {
  private readonly logger = new Logger(GlucoseAuthService.name);
  private glucoseAuthRetryAfter: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: GlucoseConfig,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private isTokenValid(tokenExpires: number): boolean {
    return tokenExpires > Date.now() + GLUCOSE_CONSTANTS.AUTH.BUFFER_TIME_SEC;
  }

  async fetchAuth(
    regenerateToken: boolean = false,
  ): Promise<FetchAuthResponse> {
    if (!regenerateToken) {
      const cached = await this.cacheManager.get<FetchAuthResponse>(
        GLUCOSE_CONSTANTS.AUTH.CACHE_KEY,
      );

      if (cached && this.isTokenValid(cached.expires)) {
        this.logger.debug('Using cached LibreView auth token');
        return cached;
      }
    }

    const token = await this.authenticate();
    await this.cacheManager.set(
      GLUCOSE_CONSTANTS.AUTH.CACHE_KEY,
      token,
      token.duration,
    );
    return token;
  }

  private async authenticate(): Promise<FetchAuthResponse> {
    try {
      if (
        this.glucoseAuthRetryAfter &&
        this.glucoseAuthRetryAfter > Date.now()
      ) {
        throw new Error('rate limit exceeded, try later');
      }
      this.logger.debug('Fetching new LibreView auth token');
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.config.apiUrl}/auth/login`,
          { email: this.config.email, password: this.config.password },
          {
            headers: {
              product: this.config.product,
              version: this.config.version,
            },
            validateStatus: () => true,
          },
        ),
      );
      const data = response.data;

      if (response.status !== 200 || data.status !== 0) {
        if (response.headers['retry-after']) {
          this.glucoseAuthRetryAfter =
            Date.now() +
            Number(response.headers['retry-after']) *
              GLUCOSE_CONSTANTS.SEC_TO_MS;
          this.logger.warn(
            `LibreView Auth API rate limit exceeded, retry after ${response.headers['retry-after']} seconds`,
          );
        }

        throw new Error(
          data.error?.message || response.status || 'unknown error',
        );
      }

      const token = data.data?.authTicket?.token;
      const patientId = data.data?.user?.id;
      const expires =
        data.data?.authTicket?.expires * GLUCOSE_CONSTANTS.SEC_TO_MS;
      const duration = data.data?.authTicket?.duration;

      if (!token || !expires || !duration || !patientId) {
        throw new Error('invalid authentication response');
      }

      this.logger.debug('Fetched new LibreView auth token');
      return { token, patientId, expires, duration };
    } catch (error) {
      this.logger.error(`Authentication failed: ${error.message || error}`);
      throw `Auth error: ${error}`;
    }
  }
}
