import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dexcom')
export class DexcomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'refresh_token', unique: true })
  refreshToken: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
