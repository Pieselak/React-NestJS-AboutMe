import { ApiProperty } from '@nestjs/swagger';
import { GlucoseUnits } from '../../glucose.enum';

export class GetHighestGlucoseResponse {
  @ApiProperty({
    type: Boolean,
    description:
      'Indicates whether sufficient data is available for calculation',
    example: true,
  })
  sufficientData: boolean;

  @ApiProperty({
    type: Number,
    description:
      'Highest glucose measurement value recorded in the specified period',
    example: 320,
  })
  value: number;

  @ApiProperty({
    type: String,
    enum: GlucoseUnits,
    enumName: 'GlucoseUnit',
    description: 'Unit of measurement for glucose value',
    example: GlucoseUnits.MG_DL,
  })
  unit: string;

  @ApiProperty({
    type: Number,
    description: 'Number of hours included in the calculation period',
    example: 24,
    required: false,
  })
  hours?: number;
}
