import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';
import { GlucoseoldService } from './glucoseold.service';
import { FetchDataResponse } from './responses/getData';
import { GetAverageResponse } from './responses/getAverage';
import { GetAverageDto } from './dto/getAverage';
import { GetTimeInRangeOldResponse } from './responses/getTimeInRange';
import { GetTimeInRangeDto } from './dto/getTimeInRange';

@Controller('glucoseold')
export class GlucoseoldController {
  constructor(private readonly glucoseService: GlucoseoldService) {}

  @Get('getData')
  @ApiOperation({
    summary: 'Fetch glucose data',
    description: 'Retrieves glucose data from the service.',
  })
  @ApiOkResponse({
    type: FetchDataResponse,
    description: 'Glucose data retrieved successfully',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getData(): Promise<FetchDataResponse> {
    return await this.glucoseService.getData();
  }

  @Get('getAverage')
  @ApiOperation({
    summary: 'Fetch average glucose',
    description: 'Retrieves average glucose based on query parameters.',
  })
  @ApiOkResponse({
    type: GetAverageResponse,
    description: 'Average glucose data retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getAverage(@Query() query: GetAverageDto): Promise<GetAverageResponse> {
    return await this.glucoseService.getAverage(query);
  }

  @Get('getTimeInRange')
  @ApiOperation({
    summary: 'Fetch time in range',
    description: 'Retrieves time in range based on query parameters.',
  })
  @ApiOkResponse({
    type: GetTimeInRangeOldResponse,
    description: 'Time in Range data retrieved successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getTimeInRange(
    @Query() query: GetTimeInRangeDto,
  ): Promise<GetTimeInRangeOldResponse> {
    return await this.glucoseService.getTimeInRange(query);
  }
}
