import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { OwnersOrAssociatesDto } from './dto/owners_or_associates.dto';
import { OwnersOrAssociates } from './interfaces/owners_or_associates.interface';
import { address } from './interfaces/address.interface';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@Controller('projects')
export class ProjectsController {

    constructor(
        private readonly projectsService: ProjectsService
    ){}

    @Post('create')
    @UseGuards(AuthGuard)
    async createProject(
        @Req() req: any,
        @Body() createProjectDto: CreateProjectDto
    ){  
        const userId = req.user.id
        return this.projectsService.create(userId, createProjectDto)
    }

    @Get('/all')
    @UseGuards(AuthGuard)
    async getAllProjects(
        @Req() req: any
    ){
        const userId = req.user.id
        return this.projectsService.getAll(userId);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getOneProject(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.projectsService.getOne(userId, id);
    }

    @Patch('/update/:id')
    @UseGuards(AuthGuard)
    async updateProject(
        @Req() req: any,
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ){
        const userId = req.user.id
        return this.projectsService.update(userId, id, updateProjectDto)
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard)
    async deleteProject(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.projectsService.delete(userId, id);
    }
}
