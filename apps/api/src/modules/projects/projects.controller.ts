import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/createProject';
import { UpdateProjectDto } from './dto/updateProject';
import { GetProjectResponse } from './responses/getProject';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateProjectResponse } from './responses/updateProject';
import { CreateProjectResponse } from './responses/createProject';
import { ProjectsService } from './project.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get() // tbd: responses, service function
  @ApiOperation({
    summary: 'Retrieve a list of all projects',
    description:
      'Fetches and returns an array of all project entities stored in the system.',
  })
  @ApiOkResponse({
    type: Array<GetProjectResponse>,
    description: 'List of all projects retrieved successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async getProjects(): Promise<GetProjectResponse[]> {
    return this.projectService.findAllProjects();
  }

  @Get(':id') // tbd: responses, service function
  @ApiOperation({
    summary: 'Retrieve a project',
    description:
      'Fetches and returns a single project entity based on the provided ID.',
  })
  @ApiOkResponse({
    type: GetProjectResponse,
    description: 'Project retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project with the specified ID not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  getProjectById(@Param('id') id: string): GetProjectResponse {
    throw new NotImplementedException();
  }

  @Post() // tbd: responses, service function
  @ApiOperation({
    summary: 'Create a new project',
    description: 'Creates a new project entity with the provided data.',
  })
  @ApiOkResponse({
    type: GetProjectResponse,
    description: 'Project created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  createProject(@Body() body: CreateProjectDto): CreateProjectResponse {
    throw new NotImplementedException();
  }

  @Patch(':id') // tbd: responses, service function
  @ApiOperation({
    summary: 'Update an existing project',
    description:
      'Updates the project entity identified by the provided ID with new data.',
  })
  @ApiOkResponse({
    type: UpdateProjectResponse,
    description: 'Project updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project with the specified ID not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  updateProject(
    @Param('id') id: string,
    @Body() body: UpdateProjectDto,
  ): UpdateProjectResponse {
    throw new NotImplementedException();
  }

  @Delete(':id') // tbd: responses, service function
  @ApiOperation({
    summary: 'Delete a project',
    description: 'Deletes the project entity identified by the provided ID.',
  })
  @ApiOkResponse({
    // type:
    description: 'Project deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Project with the specified ID not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  deleteProject(@Param('id') id: string) {
    throw new NotImplementedException();
  }
}
