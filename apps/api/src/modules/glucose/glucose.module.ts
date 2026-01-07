import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlucoseController } from './controllers/glucose.controller';
import { GlucoseAuthController } from './controllers/glucoseAuth.controller';
import { GlucoseStatisticsController } from './controllers/glucoseStatistics.controller';

import { HttpConfig } from '../../config/http.config';
import { CacheConfig } from '../../config/cache.config';
import { GlucoseConfig } from '../../config/glucose.config';

import { GlucoseService } from './services/glucose.service';
import { GlucoseLibreService } from './services/libre/libre.service';
import { GlucoseLibreAuthService } from './services/libre/libreAuth.service';
import { GlucoseLibreTransformer } from './services/libre/libre.transformer';
import { GlucoseDexcomService } from './services/dexcom/dexcom.service';
import { GlucoseDexcomAuthService } from './services/dexcom/dexcomAuth.service';

import { GlucoseDexcomConfig } from '../../config/glucose-dexcom.config';
import { GlucoseLibreConfig } from '../../config/glucose-libre.config';

import { DexcomEntity } from './entities/dexcom.entity';
import { GlucoseDexcomRepository } from './repositories/dexcom.repository';
import { GlucoseRepository } from './repositories/glucose.repository';
import { GlucoseEntity } from './entities/glucose.entity';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfig,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfig,
    }),
    TypeOrmModule.forFeature([DexcomEntity, GlucoseEntity]),
  ],
  controllers: [
    GlucoseController,
    GlucoseAuthController,
    GlucoseStatisticsController,
  ],
  providers: [
    GlucoseService,
    GlucoseLibreService,
    GlucoseLibreAuthService,
    GlucoseLibreTransformer,
    GlucoseDexcomService,
    GlucoseDexcomAuthService,
    GlucoseDexcomRepository,
    GlucoseConfig,
    GlucoseLibreConfig,
    GlucoseDexcomConfig,
    GlucoseRepository,
  ],
})
export class GlucoseModule {}
