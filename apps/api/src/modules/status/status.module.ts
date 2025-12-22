import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscoveryService } from '@nestjs/core';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { StatusRepository } from './status.repository';
import { SettingsEntity } from '../../entities/settings.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SettingsEntity])],
  controllers: [StatusController],
  providers: [StatusService, DiscoveryService, StatusRepository],
  exports: [StatusService],
})
export class StatusModule {}
