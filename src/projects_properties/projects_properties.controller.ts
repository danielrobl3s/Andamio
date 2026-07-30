import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Session, UseGuards } from '@nestjs/common';
import { ProjectsPropertiesService } from './projects_properties.service';
import { CreateProjectsProperties } from './dto/create-projects-properties.dto';
import { UpdateProjectsProperties } from './dto/update-projects-properties.dto';
import { AuthGuard, type UserSession } from '@thallesp/nestjs-better-auth';

@UseGuards(AuthGuard)
@Controller('projects-properties')
export class ProjectsPropertiesController {
    constructor(
        private readonly projectsPropertiesService: ProjectsPropertiesService
    ){}


    @Get('')
    async getAllProperties(
        @Session() session: UserSession,
    ){
        const userId = session.user.id
        return this.projectsPropertiesService.getAll(userId);
    }

    @Get('/:id')
    async getOnePropertyById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.projectsPropertiesService.getOne(userId, id);
    }

    @Post('/create')
    async createProperty(
        @Session() session: UserSession,
        @Body() createProjectsProperties: CreateProjectsProperties
    ){
        const userId = session.user.id
        return this.projectsPropertiesService.create(userId, createProjectsProperties);
    }

    @Patch('/update/:id')
    async updateProperty(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateProjectsProperties
    ){
        const userId = session.user.id
        return this.projectsPropertiesService.update(userId, id, body)
    }

    @Delete('/delete/:id')
    async deleteProperty(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.projectsPropertiesService.delete(userId, id);
    }
}
