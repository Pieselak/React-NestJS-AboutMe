import { ApiProperty } from '@nestjs/swagger';
import { GlucoseColors, GlucoseStatus, GlucoseUnits } from '../../glucose.enum';

class GraphDataPoint {
  @ApiProperty({
    type: Number,
    description: 'Glucose measurement value at the specified timestamp',
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
    type: String,
    enum: GlucoseColors,
    enumName: 'GlucoseColor',
    description: 'Color indicator representing the glucose level range',
    example: GlucoseColors.GREEN,
  })
  color: string;

  @ApiProperty({
    type: String,
    enum: GlucoseStatus,
    enumName: 'GlucoseStatus',
    description: 'Status of the glucose measurement',
    example: GlucoseStatus.COMPUTABLE,
  })
  status: string;

  @ApiProperty({
    type: Number,
    description:
      'Unix timestamp in milliseconds when the glucose reading was taken',
    example: 1672531199000,
  })
  timestamp: number;
}

export class GetGraphDataResponse {
  @ApiProperty({
    type: [GraphDataPoint],
    description: 'Collection of glucose data points for graph visualization',
    example: [
      {
        value: 118,
        unit: GlucoseUnits.MG_DL,
        color: GlucoseColors.GREEN,
        status: GlucoseStatus.COMPUTABLE,
        timestamp: 1672531199000,
      },
      {
        value: 115,
        unit: GlucoseUnits.MG_DL,
        color: GlucoseColors.GREEN,
        status: GlucoseStatus.COMPUTABLE,
        timestamp: 1672534799000,
      },
    ],
  })
  data: GraphDataPoint[];

  @ApiProperty({
    type: Number,
    description: 'Lower threshold of the target glucose range',
    example: 70,
  })
  targetLow: number;

  @ApiProperty({
    type: Number,
    description: 'Upper threshold of the target glucose range',
    example: 180,
  })
  targetHigh: number;

  @ApiProperty({
    type: Number,
    description: 'Lower threshold of the critical glucose level',
    example: 54,
  })
  levelLow: number;

  @ApiProperty({
    type: Number,
    description: 'Upper threshold of the critical glucose level',
    example: 250,
  })
  levelHigh: number;

  @ApiProperty({
    type: Number,
    description:
      'Unix timestamp in milliseconds when the next data update will occur',
    example: 1672534799000,
  })
  refreshAt: number;

  @ApiProperty({
    type: Number,
    description: 'Time in milliseconds until the next data update is expected',
    example: 60000,
  })
  refreshIn: number;
}
