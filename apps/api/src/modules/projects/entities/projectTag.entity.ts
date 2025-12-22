import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('projects_tags')
export class ProjectTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  label: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string;

  @ManyToMany(() => ProjectEntity, (project) => project.tags, {
    cascade: true,
  })
  projects: ProjectEntity[];
}
