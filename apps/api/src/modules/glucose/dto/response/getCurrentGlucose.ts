import { ApiProperty } from '@nestjs/swagger';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';

export class GetCurrentGlucoseResponse {
  @ApiProperty({
    type: Number,
    description: 'Current glucose value',
    example: 118,
  })
  value: number;

  @ApiProperty({
    type: String,
    enum: GLUCOSE_CONSTANTS.UNITS,
    enumName: 'GlucoseUnit',
    description: 'Unit of measurement for glucose value',
    example: GLUCOSE_CONSTANTS.UNITS[1],
  })
  unit: string;

  @ApiProperty({
    type: String,
    enum: GLUCOSE_CONSTANTS.COLORS,
    enumName: 'GlucoseColor',
    description: 'Color code representing glucose level',
    example: GLUCOSE_CONSTANTS.COLORS[1],
  })
  color: string;

  @ApiProperty({
    type: String,
    enum: GLUCOSE_CONSTANTS.TRENDS,
    enumName: 'GlucoseTrend',
    description: 'Trend of the glucose reading',
    example: GLUCOSE_CONSTANTS.TRENDS[3],
  })
  trend: string;

  @ApiProperty({
    type: String,
    description: 'Status of the glucose reading',
    enum: GLUCOSE_CONSTANTS.STATUS,
    enumName: 'GlucoseStatus',
    example: GLUCOSE_CONSTANTS.STATUS[1],
  })
  status: string;

  @ApiProperty({
    type: String,
    description: 'Timestamp of the glucose reading in milliseconds since epoch',
    example: 1672531199000,
  })
  timestamp: number;
}
