import { Controller, Get, Query } from '@nestjs/common';
import { GlucoseDexcomAuthService } from '../services/dexcom/dexcomAuth.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HandleDexcomOAuthQuery } from '../dto/input/handleDexcomOAuth';
import { BuildDexcomOAuthURLResponse } from '../dto/response/buildDexcomOAuthURL';
import { HandleDexcomOAuthResponse } from '../dto/response/handleDexcomOAuth';
import { Throttle } from '@nestjs/throttler';
import { GlucoseLibreAuthService } from '../services/libre/libreAuth.service';

@Controller('glucose/auth')
@ApiTags('Glucose Authentication')
export class GlucoseAuthController {
  constructor(
    private readonly dexcomAuthService: GlucoseDexcomAuthService,
    private readonly libreAuthService: GlucoseLibreAuthService,
  ) {}

  @Get('dexcom/url')
  @ApiOperation({
    summary: 'Get Dexcom OAuth URL',
    description: 'Retrieves the OAuth URL for Dexcom authentication.',
  })
  @ApiOkResponse({
    type: BuildDexcomOAuthURLResponse,
    description: 'Successfully retrieved Dexcom OAuth URL',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  getDexcomOAuthURL(): BuildDexcomOAuthURLResponse {
    return this.dexcomAuthService.buildOAuthURL();
  }

  @Get('dexcom/callback')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({
    summary: 'Dexcom OAuth endpoint',
    description: 'Handles OAuth authentication with Dexcom service.',
  })
  @ApiOkResponse({
    type: HandleDexcomOAuthResponse,
    description: 'Successfully authenticated with Dexcom',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, possibly due to OAuth error',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async handleDexcomOAuth(
    @Query() query: HandleDexcomOAuthQuery,
  ): Promise<HandleDexcomOAuthResponse> {
    return await this.dexcomAuthService.handleOAuth(query);
  }
}
