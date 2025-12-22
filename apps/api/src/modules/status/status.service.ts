import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ServiceStatus, StatusCheckResponse } from './dto/response/getStatus';
import { StatusRepository } from './status.repository';
import { MaintenanceModeInput } from './dto/input/maintenanceMode';
import { MaintenanceModeResponse } from './dto/response/maintenanceMode';

@Injectable()
export class StatusService {
  constructor(private readonly repository: StatusRepository) {}

  async getStatus(): Promise<StatusCheckResponse> {
    let operationalStatus = ServiceStatus.OPERATIONAL;

    const maintenance = await this.repository.getMaintenanceStatus();
    if (maintenance && maintenance.enabled) {
      operationalStatus = ServiceStatus.MAINTENANCE;
    }

    return {
      status: operationalStatus,
      uptime: process.uptime(),
      timestamp: Number(Date.now()),
    };
  }

  async toggleMaintenanceMode(
    body: MaintenanceModeInput,
  ): Promise<MaintenanceModeResponse> {
    try {
      const maintenanceSetting = await this.repository.getMaintenanceStatus();
      if (maintenanceSetting && maintenanceSetting.enabled === body.enable) {
        return {
          enabled: maintenanceSetting.enabled,
          message: `Maintenance mode is already ${
            body.enable ? 'enabled' : 'disabled'
          }.`,
        };
      }

      await this.repository.seveMaintenanceStatus(body.enable);
      return {
        enabled: body.enable,
        message: `Maintenance mode has been ${
          body.enable ? 'enabled' : 'disabled'
        }.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update maintenance mode.',
      );
    }
  }
}
