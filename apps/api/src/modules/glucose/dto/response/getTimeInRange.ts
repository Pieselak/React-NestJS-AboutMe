import { ApiProperty } from '@nestjs/swagger';

export class GetTimeInRangeResponse {
  @ApiProperty({
    type: Number,
    description: 'Percentage of time with high glucose levels',
    example: 5,
  })
  percentageHigh: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time within target glucose range',
    example: 15,
  })
  percentageAboveRange: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time below target glucose range',
    example: 70,
  })
  percentageInRange: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time with low glucose levels',
    example: 7,
  })
  percentageBelowRange: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time with very low glucose levels',
    example: 3,
  })
  percentageLow: number;
}
