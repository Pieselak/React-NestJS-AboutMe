import { ApiProperty } from '@nestjs/swagger';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';

export class GetAverageGlucoseResponse {
  @ApiProperty({
    type: Number,
    description: 'Average glucose value',
    example: 118,
  })
  value: number;

  @ApiProperty({
    type: String,
    description: 'Unit of measurement for glucose value',
    enum: GLUCOSE_CONSTANTS.UNITS,
    enumName: 'GlucoseUnit',
    example: GLUCOSE_CONSTANTS.UNITS[1],
  })
  unit: string;

  @ApiProperty({
    type: Number,
    description: 'Number of hours the average was calculated over',
    example: 24,
    required: false,
  })
  hours?: number;
}
