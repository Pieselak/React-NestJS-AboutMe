import { ApiProperty } from '@nestjs/swagger';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';

export class GetLowestGlucoseResponse {
  @ApiProperty({
    type: Number,
    description: 'Lowest glucose value recorded',
    example: 55,
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
}
