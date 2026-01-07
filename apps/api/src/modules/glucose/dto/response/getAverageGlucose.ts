import { ApiProperty } from '@nestjs/swagger';
import { GlucoseUnits } from '../../glucose.enum';

export class GetAverageGlucoseResponse {
  @ApiProperty({
    type: Boolean,
    description: 'Indicates if there is sufficient data to calculate',
    example: true,
  })
  sufficientData: boolean;

  @ApiProperty({
    type: Number,
    description: 'Average glucose value',
    example: 118,
  })
  value: number;

  @ApiProperty({
    type: String,
    description: 'Unit of measurement for glucose value',
    enum: GlucoseUnits,
    enumName: 'GlucoseUnit',
    example: GlucoseUnits.MG_DL,
  })
  unit: string;

  @ApiProperty({
    type: Number,
    description: 'Optional number of hours to consider for the calculation',
    example: 24,
    required: false,
  })
  hours?: number;
}
