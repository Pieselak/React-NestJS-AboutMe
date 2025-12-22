// typescript
import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { StatusService } from '../modules/status/status.service';
import { ServiceStatus } from '../modules/status/dto/response/getStatus';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  constructor(private readonly statusService: StatusService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const statusCheck = await this.statusService.getStatus();
    if (statusCheck.status === ServiceStatus.MAINTENANCE) {
      throw new ServiceUnavailableException('The service is under maintenance');
    }
    next();
  }
}
