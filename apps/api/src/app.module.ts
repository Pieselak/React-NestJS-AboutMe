import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { requireEnv } from './helpers/env';
import { MaintenanceMiddleware } from './middleware/maintenance.middleware';
import { GlucoseOldModule } from './modules/oldGlucose/glucoseold.module';
import { StatusModule } from './modules/status/status.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { GlucoseModule } from './modules/glucose/glucose.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: requireEnv('DB_HOST'),
      port: Number(requireEnv('DB_PORT')),
      username: requireEnv('DB_USER'),
      password: requireEnv('DB_PASS'),
      database: requireEnv('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    StatusModule,
    ProjectsModule,
    GlucoseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MaintenanceMiddleware).forRoutes('glucose');
  }
}
