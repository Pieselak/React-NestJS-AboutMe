import { Injectable } from '@nestjs/common';
import {
  IsBooleanString,
  IsOptional,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

class RedisConfigDto {
  @IsString()
  @IsUrl({
    require_tld: false,
    require_protocol: true,
    protocols: ['redis', 'rediss'],
  })
  REDIS_URL: string;

  @IsOptional()
  @IsBooleanString()
  REDIS_REQUIRED?: string;
}

@Injectable()
export class RedisConfig {
  readonly url: string;
  readonly required: boolean;

  constructor() {
    const config = plainToClass(RedisConfigDto, process.env);
    const errors = validateSync(config);

    if (errors.length > 0) {
      throw new Error(`Invalid redis configuration: ${JSON.stringify(errors)}`);
    }

    this.url = config.REDIS_URL;
    this.required =
      config.REDIS_REQUIRED !== undefined
        ? config.REDIS_REQUIRED === 'true'
        : process.env.NODE_ENV !== 'localdevelopment';
  }
}
