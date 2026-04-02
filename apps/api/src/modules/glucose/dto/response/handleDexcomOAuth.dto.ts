import { ApiProperty } from '@nestjs/swagger';

export class HandleDexcomOAuthResponse {
  @ApiProperty({
    type: String,
    description:
      'Message indicating the result of the OAuth authentication process',
    example: 'Dexcom OAuth successful.',
  })
  message: string;
}
