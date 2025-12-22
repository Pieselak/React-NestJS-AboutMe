import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAverageDto {
  @ApiProperty({
    description: 'Number of hours to calculate average glucose for',
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
