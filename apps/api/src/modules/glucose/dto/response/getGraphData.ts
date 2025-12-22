import { ApiProperty } from '@nestjs/swagger';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';

class GraphDataPoint {
  @ApiProperty({
    type: Number,
    description: 'Glucose value at the given timestamp',
    example: 118,
  })
  value: number;

  @ApiProperty({
    type: String,
    description: 'Unit of measurement for glucose value',
    enum: GLUCOSE_CONSTANTS.UNITS,
    enumName: 'GlucoseUnit',
    example: 'mg/dL',
  })
  unit: string;

  @ApiProperty({
    type: Number,
    description: 'Timestamp of the glucose reading in milliseconds since epoch',
    example: 1672531199000,
  })
  timestamp: number; // timestamp in milliseconds
}

export class GetGraphDataResponse {
  @ApiProperty({
    type: [GraphDataPoint],
    description: 'Array of glucose data points for graphing',
    example: [
      {
        value: 118,
        unit: GLUCOSE_CONSTANTS.UNITS[1],
        timestamp: 1672531199000,
      },
      {
        value: 115,
        unit: GLUCOSE_CONSTANTS.UNITS[1],
        timestamp: 1672534799000,
      },
    ],
  })
  data: GraphDataPoint[];

  @ApiProperty({
    type: Number,
    description:
      'Timestamp of the most recent glucose reading in milliseconds since epoch',
    example: 1672534799000,
  })
  timestamp: number; // timestamp in milliseconds
}
