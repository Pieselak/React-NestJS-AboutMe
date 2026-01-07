import { Controller, Get, Param, Query } from '@nestjs/common';
import { GlucoseService } from '../services/glucose.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetTimeInRangeResponse } from '../dto/response/getTimeInRange';
import { GetAverageGlucoseResponse } from '../dto/response/getAverageGlucose';
import { GetHighestGlucoseResponse } from '../dto/response/getHighestGlucose';
import { GetLowestGlucoseResponse } from '../dto/response/getLowestGlucose';
import { GetTimeInRangeQuery } from '../dto/input/getTimeInRange';
import { GetAverageGlucoseQuery } from '../dto/input/getAverageGlucose';
import { GetHighestGlucoseQuery } from '../dto/input/getHighestGlucose';
import { GetLowestGlucoseQuery } from '../dto/input/getLowestGlucose';

@Controller('glucose/statistics')
@ApiTags('Glucose Statistics')
export class GlucoseStatisticsController {
  constructor(private readonly glucoseService: GlucoseService) {}

  @Get('time-in-range')
  @ApiOperation({
    summary: 'Get time in range data',
    description: 'Retrieves time in range statistics for glucose levels.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved time in range data',
    type: GetTimeInRangeResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getTimeInRange(
    @Query() query: GetTimeInRangeQuery,
  ): Promise<GetTimeInRangeResponse> {
    return await this.glucoseService.getTimeInRange(query);
  }

  @Get('average')
  @ApiOperation({
    summary: 'Get average glucose',
    description: 'Retrieves average glucose level statistics.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved average glucose data',
    type: GetAverageGlucoseResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getAverageGlucose(
    @Query() query: GetAverageGlucoseQuery,
  ): Promise<GetAverageGlucoseResponse> {
    return await this.glucoseService.getAverageGlucose(query);
  }

  @ApiOperation({
    summary: 'Get highest glucose',
    description: 'Retrieves the highest recorded glucose level.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved highest glucose data',
    type: GetHighestGlucoseResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  @Get('highest')
  async getHighestGlucose(
    @Query() query: GetHighestGlucoseQuery,
  ): Promise<GetHighestGlucoseResponse> {
    return await this.glucoseService.getHighestGlucose(query);
  }

  @Get('lowest')
  @ApiOperation({
    summary: 'Get lowest glucose',
    description: 'Retrieves the lowest recorded glucose level.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved lowest glucose data',
    type: GetLowestGlucoseResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getLowestGlucose(
    @Query() query: GetLowestGlucoseQuery,
  ): Promise<GetLowestGlucoseResponse> {
    return await this.glucoseService.getLowestGlucose(query);
  }
}
