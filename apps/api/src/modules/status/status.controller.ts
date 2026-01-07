import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusService } from './status.service';
import { StatusCheckResponse } from './dto/response/getStatus';
import { MaintenanceModeResponse } from './dto/response/maintenanceMode';
import { MaintenanceModeInput } from './dto/input/maintenanceMode';
import * as fs from 'node:fs';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({
    summary: 'Check service status',
    description: 'Checks the current operational status of the service.',
  })
  @ApiOkResponse({
    type: StatusCheckResponse,
    description: 'Service status check response',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getStatus(): Promise<StatusCheckResponse> {
    return await this.statusService.getStatus();
  }

  @Get('secret')
  @ApiExcludeEndpoint()
  getSecret() {
    return fs.readFileSync('src/modules/status/secret.html', 'utf-8');
  }

  @Post('maintenance')
  @ApiOperation({
    summary: 'Toggle maintenance mode',
    description:
      'Enables or disables maintenance mode for the service. Requires admin privileges.',
  })
  @ApiOkResponse({
    type: MaintenanceModeResponse,
    description: 'Maintenance mode updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  async maintenanceMode(
    @Body() body: MaintenanceModeInput,
  ): Promise<MaintenanceModeResponse> {
    return await this.statusService.toggleMaintenanceMode(body);
  }
}
