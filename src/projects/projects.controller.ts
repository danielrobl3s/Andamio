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
        return this.projectsService.create(req.user_id, createProjectDto)
    }

    @Get('/all')
    @UseGuards(AuthGuard)
    async getAllProjects(){
        return this.projectsService.getAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getOneProject(
        @Param('id') id: string
    ){
        return this.projectsService.getOne(id);
    }

    @Patch('/update/:id')
    @UseGuards(AuthGuard)
    async updateProject(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ){
        return this.projectsService.update(id, updateProjectDto)
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard)
    async deleteProject(
        @Param('id') id: string
    ){
        return this.projectsService.delete(id);
    }
}
