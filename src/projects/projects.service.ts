import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InputJsonValue } from '@prisma/client/runtime/binary';
import { OwnersOrAssociates } from './interfaces/owners_or_associates.interface';
import { address } from './interfaces/address.interface';
import { map } from 'rxjs';
import { OwnersOrAssociatesDto } from './dto/owners_or_associates.dto';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { ProjectMapped } from './interfaces/project_mapped.interface';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async getAll(): Promise<ProjectMapped[]> {
        const returned_projects = await this.prismaService.project.findMany();

        const mapped: ProjectMapped[] = returned_projects.map((project) => ({
            ...project,
            owners_or_associates: (project.owners_or_associates as unknown) as OwnersOrAssociates[],
            address: (project.address as unknown) as address
        }));

        mapped.forEach((project)=>{
            console.log(project.address.lng, project.address.lat)
        })

        return mapped;
    }

    async getOne(id: string){
        const project = await this.prismaService.project.findUnique({
            where: {
                id: id
            }
        });

        return {
            ...project,
            owners_or_associates: project?.owners_or_associates as unknown as OwnersOrAssociates,
            address: project?.address as unknown as address
        }
    }

    async create(createProjectDto: CreateProjectDto){

        const owners_or_associates_array: OwnersOrAssociates[] = Array.isArray(createProjectDto.owners_or_associates) ? createProjectDto.owners_or_associates : [createProjectDto.owners_or_associates];
        const createdProject = await this.prismaService.project.create({

            
            data: {
                ...createProjectDto,
                owners_or_associates: owners_or_associates_array as unknown as InputJsonValue,
                address: createProjectDto.address as unknown as InputJsonValue
            }
        })

        return {
            ...createdProject,
            owners_or_associates: createdProject.owners_or_associates as unknown as OwnersOrAssociates,
            start_date: new Date(createdProject.start_date),
            address: createdProject.address as unknown as address
        }
    }

    async update(id: string, updateProjectDto: UpdateProjectDto){
        const updated_project = await this.prismaService.project.update({
            where: {id: id},
            data: {
                ...updateProjectDto,
                owners_or_associates: updateProjectDto.owners_or_associates as unknown as InputJsonValue,
                address: updateProjectDto.address as unknown as InputJsonValue
            }
        })

        return {
            ...updated_project,
            owners_or_associates: updated_project.owners_or_associates as unknown as OwnersOrAssociates,
            address: updated_project.address as unknown as address
        }
    }

    async delete(id: string){
        const deleted_project = await this.prismaService.project.delete({
            where: {id: id}
        })

        return {
            ...deleted_project,
            owners_or_associates: deleted_project.owners_or_associates as unknown as OwnersOrAssociates,
            address: deleted_project.address as unknown as address
        }
    }
}
