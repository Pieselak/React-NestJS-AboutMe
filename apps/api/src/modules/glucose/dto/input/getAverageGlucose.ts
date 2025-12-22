import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class GetAverageGlucoseInput {
  @ApiProperty({
    description: 'Number of hours to look back for average glucose calculation',
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
