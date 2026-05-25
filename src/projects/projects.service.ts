import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { InputJsonValue } from '@prisma/client/runtime/binary';
import { OwnersOrAssociates } from './interfaces/owners_or_associates.interface';
import { address } from './interfaces/address.dto';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async getAll(){
        return this.prismaService.project.findMany();
    }

    async getOne(id: string){
        return this.prismaService.project.findUnique({
            where: {
                id: id
            }
        });
    }

    async create(createProjectDto: CreateProjectDto){
        const createdProject = await this.prismaService.project.create({
            data: {
                ...createProjectDto,
                owners_or_associates: createProjectDto.owners_or_associates as unknown as InputJsonValue,
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
}
