import { ApiProperty } from '@nestjs/swagger';

export class GetTimeInRangeOldResponse {
  @ApiProperty({
    description: 'Time spent in high sugar range',
    example: 15,
  })
  high: number;
  @ApiProperty({
    description: 'Time spent above target range',
    example: 30,
  })
  aboveRange: number;
  @ApiProperty({
    description: 'Time spent in target range',
    example: 480,
  })
  inRange: number;
  @ApiProperty({
    description: 'Time spent below target range',
    example: 10,
  })
  belowRange: number;
  @ApiProperty({
    description: 'Time spent in low sugar range',
    example: 5,
  })
  low: number;
  @ApiProperty({
    type: Number,
    description: 'Number of hours the time in range was calculated over',
    example: 24,
    required: false,
  })
  hours?: number;
}
