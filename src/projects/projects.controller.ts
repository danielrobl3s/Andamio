import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { OwnersOrAssociatesDto } from './dto/owners_or_associates.dto';
import { OwnersOrAssociates } from './interfaces/owners_or_associates.interface';
import { address } from './interfaces/address.interface';
import { UpdateProjectDto } from './dto/update-project.dto';

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

    @Get('/all')
    async getAllProjects(){
        return this.projectsService.getAll();
    }

    @Get('/:id')
    async getOneProject(
        @Param('id') id: string
    ){
        return this.projectsService.getOne(id);
    }

    @Patch('/update/:id')
    async updateProject(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ){
        return this.projectsService.update(id, updateProjectDto)
    }

    @Delete('/delete/:id')
    async deleteProject(
        @Param('id') id: string
    ){
        return this.projectsService.delete(id);
    }
}
