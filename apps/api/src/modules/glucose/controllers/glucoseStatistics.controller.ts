import { Controller, Get, Param } from '@nestjs/common';
import { GlucoseService } from '../services/glucose.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';
import { GetTimeInRangeResponse } from '../dto/response/getTimeInRange';
import { GetAverageGlucoseResponse } from '../dto/response/getAverageGlucose';
import { GetHighestGlucoseResponse } from '../dto/response/GetHighestGlucose';
import { GetLowestGlucoseResponse } from '../dto/response/GetLowestGlucose';
import { GetTimeInRangeInput } from '../dto/input/getTimeInRange';
import { GetAverageGlucoseInput } from '../dto/input/getAverageGlucose';

@Controller('glucose/statistics')
export class GlucoseStatisticsController {
  constructor(private readonly glucoseService: GlucoseService) {}

  @Get('time-in-range/{:hours}')
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
    @Param() params: GetTimeInRangeInput,
  ): Promise<GetTimeInRangeResponse> {
    return await this.glucoseService.getTimeInRange(params);
  }

  @Get('average/{:hours}')
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
    @Param() params: GetAverageGlucoseInput,
  ): Promise<GetAverageGlucoseResponse> {
    return await this.glucoseService.getAverageGlucose(params);
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
  async getHighestGlucose(): Promise<GetHighestGlucoseResponse> {
    return await this.glucoseService.getHighestGlucose();
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
  async getLowestGlucose(): Promise<GetLowestGlucoseResponse> {
    return await this.glucoseService.getLowestGlucose();
  }
}
