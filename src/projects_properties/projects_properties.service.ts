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


    async getAll(){
        return this.prismaService.projectsProperties.findMany();
    }

    async getOne(id: string){
        return this.prismaService.projectsProperties.findUnique({
            where: {
                id: id
            }
        })
    }

    async create(createProjectsProperties: CreateProjectsProperties){
        return this.prismaService.projectsProperties.create({
            data: createProjectsProperties
        })
    }

    async update(id: string, updateProjectsProperties: UpdateProjectsProperties){
        return this.prismaService.projectsProperties.update({
            where: {id: id},
            data: updateProjectsProperties
        })
    }

    async delete(id: string){
        return this.prismaService.projectsProperties.delete({
            where: {id: id}
        })
    }
}
