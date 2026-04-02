import { ApiProperty } from '@nestjs/swagger';

export class BuildDexcomOAuthURLResponse {
  @ApiProperty({
    type: String,
    description: 'Dexcom OAuth authorization URL for user authentication',
    example:
      'https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=offline_access',
  })
  url: string;
}
