import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { OwnersOrAssociatesDto } from './dto/owners_or_associates.dto';
import { OwnersOrAssociates } from './interfaces/owners_or_associates.interface';
import { address } from './interfaces/address.interface';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import {  } from '@thallesp/nestjs-better-auth'
import { getSession } from 'better-auth/api';

@Controller('projects')
export class ProjectsController {

    constructor(
        private readonly projectsService: ProjectsService
    ){}

    @Get('me')
    async getProfile(
        @Session() session: UserSession
    ){
        console.log(session.user.id)
    }

    @Post('create')
    async createProject(
        @Session() session: UserSession,
        @Body() createProjectDto: CreateProjectDto

    ){  
        const userId = session.user.id
        return this.projectsService.create(userId, createProjectDto)
    }

    @Get('/all')
    async getAllProjects(
        @Session() session: UserSession
    ){
        const userId = session.user.id
        return this.projectsService.getAll(userId);
    }

    @Get('/:id')
    async getOneProject(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.projectsService.getOne(userId, id);
    }

    @Patch('/update/:id')
    async updateProject(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto
    ){
        const userId = session.user.id
        return this.projectsService.update(userId, id, updateProjectDto)
    }

    @Delete('/delete/:id')
    async deleteProject(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.projectsService.delete(userId, id);
    }
}
