import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectsPropertiesService } from './projects_properties.service';
import { CreateProjectsProperties } from './dto/create-projects-properties.dto';
import { UpdateProjectsProperties } from './dto/update-projects-properties.dto';

@Controller('projects-properties')
export class ProjectsPropertiesController {
    constructor(
        private readonly projectsPropertiesService: ProjectsPropertiesService
    ){}


    @Get('')
    async getAllProperties(){
        return this.projectsPropertiesService.getAll();
    }

    @Get('/:id')
    async getOnePropertyById(
        @Param('id') id: string
    ){
        return this.projectsPropertiesService.getOne(id);
    }

    @Post('/create')
    async createProperty(
        @Body() createProjectsProperties: CreateProjectsProperties
    ){
        return this.projectsPropertiesService.create(createProjectsProperties);
    }

    @Patch('/update/:id')
    async updateProperty(
        @Param('id') id: string,
        @Body() body: UpdateProjectsProperties
    ){
        return this.projectsPropertiesService.update(id, body)
    }

    @Delete('/delete/:id')
    async deleteProperty(
        @Param('id') id: string
    ){
        return this.projectsPropertiesService.delete(id);
    }
}
