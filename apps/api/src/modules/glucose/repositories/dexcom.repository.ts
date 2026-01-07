import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DexcomEntity } from '../entities/dexcom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GlucoseDexcomRepository {
  constructor(
    @InjectRepository(DexcomEntity)
    private readonly dexcomRepo: Repository<DexcomEntity>,
  ) {}

  async saveRefreshToken(refreshToken: string): Promise<void> {
    try {
      const existingRecord = await this.dexcomRepo.findOne({
        where: {},
        order: { id: 'DESC' },
      });
      if (existingRecord) {
        existingRecord.refreshToken = refreshToken;
        await this.dexcomRepo.save(existingRecord);
      } else {
        const newRecord = this.dexcomRepo.create({ refreshToken });
        await this.dexcomRepo.save(newRecord);
      }
    } catch (error) {
      throw new Error(
        `Failed to save Dexcom OAuth refresh token: ${error.message}`,
      );
    }
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.dexcomRepo.delete({ refreshToken });
    } catch (error) {
      throw new Error(
        `Failed to delete Dexcom OAuth refresh token: ${error.message}`,
      );
    }
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      const record = await this.dexcomRepo.findOne({
        where: {},
        select: ['refreshToken'],
        order: { id: 'DESC' },
      });
      return record ? record.refreshToken : null;
    } catch (error) {
      throw new Error(
        `Failed to retrieve Dexcom OAuth refresh token: ${error.message}`,
      );
    }
  }
}
