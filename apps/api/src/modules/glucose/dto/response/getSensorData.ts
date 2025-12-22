import { ApiProperty } from '@nestjs/swagger';

export class GetSensorDataResponse {
  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the sensor is currently active',
    example: true,
  })
  active: boolean;

  @ApiProperty({
    type: String,
    description: 'Name of the sensor',
    example: 'Freestyle Libre 2',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: 'URL of the sensor image',
    example: 'https://example.com/sensor-image.png',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    type: Number,
    description:
      'Timestamp when the sensor will expire in milliseconds since epoch',
    example: 1672531199000,
    required: false,
  })
  expiresAt?: number; // timestamp in milliseconds

  @ApiProperty({
    type: Number,
    description:
      'Timestamp when the sensor was last uploaded in milliseconds since epoch',
    example: 1672531199000,
    required: false,
  })
  lastUploadAt?: number; // timestamp in milliseconds
}
