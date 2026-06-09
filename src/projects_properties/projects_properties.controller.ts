import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProjectsPropertiesService } from './projects_properties.service';
import { CreateProjectsProperties } from './dto/create-projects-properties.dto';
import { UpdateProjectsProperties } from './dto/update-projects-properties.dto';

@Controller('projects-properties')
export class ProjectsPropertiesController {
    constructor(
        private readonly projectsPropertiesService: ProjectsPropertiesService
    ){}


    @Get('')
    async getAllProperties(
        @Req() req: any
    ){
        const userId = req.user.id
        return this.projectsPropertiesService.getAll(userId);
    }

    @Get('/:id')
    async getOnePropertyById(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.projectsPropertiesService.getOne(userId, id);
    }

    @Post('/create')
    async createProperty(
        @Req() req: any,
        @Body() createProjectsProperties: CreateProjectsProperties
    ){
        const userId = req.user.id
        return this.projectsPropertiesService.create(userId, createProjectsProperties);
    }

    @Patch('/update/:id')
    async updateProperty(
        @Req() req: any,
        @Param('id') id: string,
        @Body() body: UpdateProjectsProperties
    ){
        const userId = req.user.id
        return this.projectsPropertiesService.update(userId, id, body)
    }

    @Delete('/delete/:id')
    async deleteProperty(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.projectsPropertiesService.delete(userId, id);
    }
}
