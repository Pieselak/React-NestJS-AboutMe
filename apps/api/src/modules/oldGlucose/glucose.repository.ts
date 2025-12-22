import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlucoseReadingEntity } from './entities/glucoseReading.entity';
import { GetAverageResponse } from './responses/getAverage';
import { GetTimeInRangeOldResponse } from './responses/getTimeInRange';
import { GLUCOSE_CONSTANTS } from '../../constants/glucose.constants';

@Injectable()
export class GlucoseRepository {
  constructor(
    @InjectRepository(GlucoseReadingEntity)
    private readonly glucoseReadingRepo: Repository<GlucoseReadingEntity>,
  ) {}

  async saveMeasurement(payload: {
    value: number;
    unit: string;
    timestamp: number | Date;
  }): Promise<GlucoseReadingEntity> {
    const timestamp =
      payload.timestamp instanceof Date
        ? payload.timestamp
        : new Date(payload.timestamp);
    const entity = this.glucoseReadingRepo.create({
      value: payload.value,
      unit: payload.unit,
      timestamp,
    });
    return this.glucoseReadingRepo.save(entity);
  }

  async getAverage(
    unit: string,
    hours?: number,
  ): Promise<GetAverageResponse | null> {
    const result = await this.glucoseReadingRepo
      .createQueryBuilder('glucose_readings')
      .select('ROUND(AVG(glucose_readings.value))', 'avg')
      .addSelect('glucose_readings.unit', 'unit')
      .where(
        `glucose_readings.unit = :unit ${hours ? 'AND HOUR(TIMEDIFF(NOW(), glucose_readings.timestamp)) <= :hours' : ''}`,
        {
          unit,
          hours,
        },
      )
      .getRawOne();
    return result?.avg
      ? { value: parseInt(result.avg), unit: result.unit }
      : null;
  }

  async getTimeInRange(
    targetLow: number,
    targetHigh: number,
    fixedLow: number,
    fixedHigh: number,
    unit: string,
    hours?: number,
  ): Promise<GetTimeInRangeOldResponse | null> {
    const result = await this.glucoseReadingRepo
      .createQueryBuilder('glucose_readings')
      .select(
        'SUM(CASE WHEN glucose_readings.value > :fixedHigh THEN 1 ELSE 0 END)',
        'high',
      )
      .addSelect(
        'SUM(CASE WHEN glucose_readings.value >= :targetHigh AND glucose_readings.value < :fixedHigh THEN 1 ELSE 0 END)',
        'aboveRange',
      )
      .addSelect(
        'SUM(CASE WHEN glucose_readings.value >= :targetLow AND glucose_readings.value <= :targetHigh THEN 1 ELSE 0 END)',
        'inRange',
      )
      .addSelect(
        'SUM(CASE WHEN glucose_readings.value >= :fixedLow AND glucose_readings.value < :targetLow THEN 1 ELSE 0 END)',
        'belowRange',
      )
      .addSelect(
        'SUM(CASE WHEN glucose_readings.value < :fixedLow THEN 1 ELSE 0 END)',
        'low',
      )
      .where(
        `glucose_readings.unit = :unit ${hours ? 'AND HOUR(TIMEDIFF(NOW(), glucose_readings.timestamp)) <= :hours' : ''}`,
        {
          unit,
          hours,
        },
      )
      .setParameters({
        targetLow,
        targetHigh,
        fixedLow,
        fixedHigh,
      })
      .getRawOne();

    return {
      high: parseInt(result.high, 10),
      aboveRange: parseInt(result.aboveRange, 10),
      inRange: parseInt(result.inRange, 10),
      belowRange: parseInt(result.belowRange, 10),
      low: parseInt(result.low, 10),
    };
  }
}
