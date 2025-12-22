import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTimeInRangeDto {
  @ApiProperty({
    type: Number,
    description: 'Number of hours to calculate time in range for',
    minimum: 1,
    required: false,
    example: {
      hours: 24,
    },
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  hours?: number;
}
