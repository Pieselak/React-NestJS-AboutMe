import { ApiProperty } from '@nestjs/swagger';

class GlucoseData {
  @ApiProperty({
    description: 'Glucose value',
    example: 120,
  })
  value: number;
  @ApiProperty({
    description: 'Unit of measurement',
    example: 'mg/dL',
    enum: ['mg/dL', 'mmo/L'],
    enumName: 'GlucoseUnit',
  })
  unit: string;
  @ApiProperty({
    description: 'Trend arrow indicator',
    example: 3,
    enum: [1, 2, 3, 4, 5],
  })
  trendArrow: number;
  @ApiProperty({
    description: 'Trend color indicator',
    example: 1,
    enum: [1, 2, 3, 4, 5],
  })
  trendColor: number;
  @ApiProperty({
    description: 'Whether the sensor is active',
    example: true,
  })
  sensorActive: boolean;
  @ApiProperty({
    description: 'Sensor expiration timestamp',
    example: 1704067200,
  })
  sensorExpires: number;
  @ApiProperty({
    description: 'Timestamp of the reading',
    example: 1704064800,
  })
  timestamp: number;
}

class GraphDataReadings {
  @ApiProperty({
    description: 'Glucose value for the reading',
    example: 115,
  })
  value: number;
  @ApiProperty({
    description: 'Unit of measurement for the reading',
    example: 'mg/dL',
    enum: ['mg/dL', 'mmo/L'],
    enumName: 'GlucoseUnit',
  })
  unit: string;
  @ApiProperty({
    description: 'Trend color indicator for the reading',
    example: 1,
    enum: [1, 2, 3, 4, 5],
  })
  trendColor: number;
  @ApiProperty({
    description: 'Timestamp of the reading',
    example: 1704064800,
  })
  timestamp: number;
}

class GraphData {
  @ApiProperty({
    type: GraphDataReadings,
    description: 'Array of glucose readings for the graph',
  })
  readings: GraphDataReadings;
  @ApiProperty({
    description: 'Target high glucose threshold',
    example: 180,
  })
  targetHigh: number;
  @ApiProperty({
    description: 'Target low glucose threshold',
    example: 70,
  })
  targetLow: number;
  @ApiProperty({
    description: 'Fixed high glucose threshold',
    example: 240,
  })
  fixedHigh: number;
  @ApiProperty({
    description: 'Fixed low glucose threshold',
    example: 55,
  })
  fixedLow: number;
  @ApiProperty({
    description: 'Alarm high glucose threshold',
    example: 240,
  })
  alarmHigh: number;
  @ApiProperty({
    description: 'Alarm low glucose threshold',
    example: 70,
  })
  alarmLow: number;
}

export class FetchDataResponse {
  @ApiProperty({
    type: GlucoseData,
    description: 'Current glucose reading',
  })
  glucoseData: GlucoseData;

  @ApiProperty({
    type: GraphData,
    description: 'Graph data with readings and thresholds',
  })
  graphData: GraphData;

  @ApiProperty({
    description: 'Timestamp for next data refresh',
    example: 1704068400,
  })
  nextRefresh: number;
}
