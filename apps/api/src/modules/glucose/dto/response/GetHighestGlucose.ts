import { ApiProperty } from '@nestjs/swagger';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';

export class GetHighestGlucoseResponse {
  @ApiProperty({
    type: Number,
    description: 'Highest glucose value recorded',
    example: 320,
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
