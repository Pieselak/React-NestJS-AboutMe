import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { GetProjectResponse } from './responses/getProject';
import { NotImplementedException } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) {}

  async findAllProjects(): Promise<GetProjectResponse[]> {
    console.log(await this.repository.findAllProjects());
    throw new NotImplementedException();
  }
}
