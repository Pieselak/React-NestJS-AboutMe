import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectStatusColorEntity } from './projectStatusColor.entity';

@Entity('projects_statuses')
export class ProjectStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @Column({ type: 'varchar', length: 255 })
  icon: string;

  @ManyToOne(() => ProjectStatusColorEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'color_id' })
  color: ProjectStatusColorEntity;
}
