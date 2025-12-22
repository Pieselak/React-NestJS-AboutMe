import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlucoseController } from './controllers/glucose.controller';
import { HttpConfig } from '../../config/http.config';
import { CacheConfig } from '../../config/cache.config';
import { GlucoseConfig } from '../../config/glucose.config';
import { GlucoseStatisticsController } from './controllers/glucoseStatistics.controller';
import { GlucoseService } from './services/glucose.service';
import { GlucoseDexcomConfig } from '../../config/glucose-dexcom.config';
import { GlucoseLibreConfig } from '../../config/glucose-libre.config';
import { GlucoseLibreService } from './services/libre/libre.service';
import { GlucoseDexcomService } from './services/dexcom/dexcom.service';
import { StatusModule } from '../status/status.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfig,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfig,
    }),
    TypeOrmModule.forFeature([]),
    StatusModule,
  ],
  controllers: [GlucoseController, GlucoseStatisticsController],
  providers: [
    GlucoseService,
    GlucoseLibreService,
    GlucoseDexcomService,
    GlucoseConfig,
    GlucoseLibreConfig,
    GlucoseDexcomConfig,
  ],
})
export class GlucoseModule {}
