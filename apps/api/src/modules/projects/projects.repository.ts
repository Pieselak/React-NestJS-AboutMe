import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { GetProjectResponse } from './dto/response/getProject';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  // async findAllProjects(): Promise<GetProjectResponse[]> {
  //   return this.projectRepo.find({
  //     relations: ['status', 'tags', 'developers'],
  //   });
  // }
  //
  // async findProjectByUuid(uuid: string): Promise<GetProjectResponse | null> {
  //   return await this.projectRepo.findOne({
  //     where: { uuid },
  //     relations: ['status', 'tags', 'developers'],
  //   }));
  // }
}
