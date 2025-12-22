import { ApiProperty } from '@nestjs/swagger';

export class GetAverageResponse {
  @ApiProperty({
    type: Number,
    description: 'Average glucose value',
    example: 118,
  })
  value: number;
  @ApiProperty({
    enum: ['mg/dL', 'mmo/L'],
    enumName: 'GlucoseUnit',
    description: 'Unit of measurement for glucose value',
    example: 'mg/dL',
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
