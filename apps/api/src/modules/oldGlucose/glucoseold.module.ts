import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlucoseoldController } from './glucoseold.controller';
import { GlucoseoldService } from './glucoseold.service';
import { GlucoseAuthService } from './glucose.auth.service';
import { GlucoseRepository } from './glucose.repository';
import { GlucoseReadingEntity } from './entities/glucoseReading.entity';
import { HttpConfig } from '../../config/http.config';
import { CacheConfig } from '../../config/cache.config';
import { GlucoseConfig } from '../../config/glucose.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfig,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfig,
    }),
    TypeOrmModule.forFeature([GlucoseReadingEntity]),
  ],
  controllers: [GlucoseoldController],
  providers: [
    GlucoseoldService,
    GlucoseAuthService,
    GlucoseRepository,
    GlucoseConfig,
  ],
})
export class GlucoseOldModule {}
