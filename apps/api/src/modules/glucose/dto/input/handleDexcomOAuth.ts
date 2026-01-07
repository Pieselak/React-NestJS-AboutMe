import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class HandleDexcomOAuthQuery {
  @ApiProperty({
    type: String,
    description: 'OAuth authorization code received from Dexcom',
    example: 'a1b2c3d4e5f6g7h8i9j0',
    required: false,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  @MaxLength(512)
  @Matches(/^[A-Za-z0-9_-]+$/, {
    message: 'Invalid authorization code format',
  })
  code?: string;

  @ApiProperty({
    type: String,
    description: 'Error message if OAuth authorization failed',
    example: 'access_denied',
    required: false,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  @MaxLength(256)
  error?: string;
}
