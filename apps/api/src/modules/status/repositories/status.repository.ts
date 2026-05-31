import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from '../../../entities/settings.entity';

@Injectable()
export class StatusRepository {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepo: Repository<SettingsEntity>,
  ) {}

  async setMaintenanceMode(enable: boolean): Promise<void> {
    const value: Record<string, any> = { enabled: enable };

    await this.settingsRepo.upsert(
      {
        code: 'MAINTENANCE',
        label: 'status.maintenance',
        value,
      },
      ['code'],
    );
  }

  async getMaintenanceMode(): Promise<{ enabled: boolean }> {
    const result = await this.settingsRepo.findOne({
      where: { code: 'MAINTENANCE' },
    });
    const enabled: boolean = result?.value?.enabled;
    return { enabled };
  }
}
