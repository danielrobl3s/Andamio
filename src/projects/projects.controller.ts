import { Body, Controller, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { OwnersOrAssociatesDto } from './dto/owners_or_associates.dto';
import { OwnersOrAssociates } from './interfaces/owners_or_associates.interface';
import { address } from './interfaces/address.dto';

@Controller('projects')
export class ProjectsController {

    constructor(
        private readonly projectsService: ProjectsService
    ){}

    @Post('create')
    async createProject(
        @Body() createProjectDto: CreateProjectDto
    ){
        return this.projectsService.create(createProjectDto)
    }
}
