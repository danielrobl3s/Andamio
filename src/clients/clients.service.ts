import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(
        userId: any,
        projectId: string,
        createClientDto: CreateClientDto
    ){
        return await this.prismaService.client.create({
            data: {
                ...createClientDto,
                project_id: projectId,
                created_by: userId
            }
        })
    }

    async getAll(userId: any, projectId: string){
        return this.prismaService.client.findMany({
            where: {created_by: userId, project_id: projectId}
        });
    }

    async getOne(userId: any, id: string, projectId: string){
        return this.prismaService.client.findUnique({
            where: {id: id, created_by: userId, project_id: projectId}
        })
    }

    async update(userId: any, id: string, updateClientDto: UpdateClientDto, projectId: string){
        return this.prismaService.client.update({
            where: {id: id, created_by: userId, project_id: projectId},
            data: updateClientDto
        })
    }

    async delete(userId: any, id: string){
        return this.prismaService.client.delete({
            where: {id: id, created_by: userId}
        })
    }
}
