import { ApiProperty } from '@nestjs/swagger';

export class GetTimeInRangeResponse {
  @ApiProperty({
    type: Boolean,
    description:
      'Indicates whether sufficient data is available for calculation',
    example: true,
  })
  sufficientData: boolean;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time with critically high glucose levels',
    example: 5,
  })
  percentageHigh: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time above target glucose range',
    example: 15,
  })
  percentageAboveRange: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time within target glucose range',
    example: 70,
  })
  percentageInRange: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time below target glucose range',
    example: 7,
  })
  percentageBelowRange: number;

  @ApiProperty({
    type: Number,
    description: 'Percentage of time with critically low glucose levels',
    example: 3,
  })
  percentageLow: number;

  @ApiProperty({
    type: Number,
    description: 'Number of hours included in the calculation period',
    example: 24,
    required: false,
  })
  hours?: number;
}
