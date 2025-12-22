import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { ProjectStatusEntity } from './entities/projectStatus.entity';
import { ProjectStatusColorEntity } from './entities/projectStatusColor.entity';
import { ProjectTagEntity } from './entities/projectTag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(ProjectStatusEntity)
    private readonly projectStatusRepo: Repository<ProjectStatusEntity>,
    @InjectRepository(ProjectStatusColorEntity)
    private readonly projectStatusColorRepo: Repository<ProjectStatusColorEntity>,
    @InjectRepository(ProjectTagEntity)
    private readonly projectTagRepo: Repository<ProjectTagEntity>,
  ) {}

  async findAllProjects(): Promise<ProjectEntity[]> {
    return this.projectRepo.find();
  }
}
