import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class GetTimeInRangeInput {
  @ApiProperty({
    description: 'Number of hours to look back for time in range calculation',
    minimum: 1,
    required: false,
    example: 24,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  hours?: number;
}
