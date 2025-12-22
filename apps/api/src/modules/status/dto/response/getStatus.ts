import { ApiProperty } from '@nestjs/swagger';

export enum ServiceStatus {
  OPERATIONAL = 'operational',
  MAINTENANCE = 'maintenance',
}

export class StatusCheckResponse {
  @ApiProperty({
    description: 'Service operational status',
    example: ServiceStatus.OPERATIONAL,
    enum: ServiceStatus,
    enumName: 'ServiceStatus',
  })
  status: ServiceStatus;

  @ApiProperty({
    description: 'Service uptime in seconds',
    example: 86400,
  })
  uptime: number;

  @ApiProperty({
    description: 'Current timestamp',
    example: 1704064800,
  })
  timestamp: number;
}
