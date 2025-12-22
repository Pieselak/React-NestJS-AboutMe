import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { requireEnv } from './utils/env';
import { MaintenanceMiddleware } from './middleware/maintenance.middleware';
import { GlucoseOldModule } from './modules/oldGlucose/glucoseold.module';
import { StatusModule } from './modules/status/status.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { GlucoseModule } from './modules/glucose/glucose.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: requireEnv('DB_HOST'),
      port: Number(requireEnv('DB_PORT')),
      username: requireEnv('DB_USER'),
      password: requireEnv('DB_PASS', true),
      database: requireEnv('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    StatusModule,
    ProjectsModule,
    GlucoseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MaintenanceMiddleware).forRoutes('glucose');
  }
}
