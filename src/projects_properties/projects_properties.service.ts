import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsProperties } from './entities/projects_properties.entity';
import { ProjectEntity } from '../projects/entities/projects.entity';
import { CreateProjectsProperties } from './dto/create-projects-properties.dto';
import { identity } from 'rxjs';
import { UpdateProjectsProperties } from './dto/update-projects-properties.dto';

@Injectable()
export class ProjectsPropertiesService {
    constructor(
        private readonly prismaService: PrismaService
    ){}


    async getAll(userId: string){
        return this.prismaService.projectsProperties.findMany({
            where: {created_by: userId}
        });
    }

    async getOne(userId: string, id: string){
        return this.prismaService.projectsProperties.findUnique({
            where: {
                id: id,
                created_by: userId
            }
        })
    }

    async create(userId: string, createProjectsProperties: CreateProjectsProperties){
        return this.prismaService.projectsProperties.create({
            data: {
                ...createProjectsProperties,
                created_by: userId
            }
        })
    }

    async update(userId: string, id: string, updateProjectsProperties: UpdateProjectsProperties){
        return this.prismaService.projectsProperties.update({
            where: {id: id, created_by: userId},
            data: updateProjectsProperties
        })
    }

    async delete(userId: string, id: string){
        return this.prismaService.projectsProperties.delete({
            where: {id: id, created_by: userId}
        })
    }
}
