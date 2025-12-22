// typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('glucose_readings')
export class GlucoseReadingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  value?: number;

  @Column({ type: 'varchar', length: 10 })
  unit?: string;

  @Column({ type: 'datetime', unique: true, name: 'timestamp' })
  timestamp: Date;
}
