import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetLowestGlucoseQuery {
  @ApiProperty({
    description: 'Number of hours to look back for lowest glucose reading',
    minimum: 1,
    required: false,
    example: 24,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(8760)
  hours?: number;
}
