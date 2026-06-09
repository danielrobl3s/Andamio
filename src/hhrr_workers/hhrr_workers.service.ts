import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHhrrWorkerDto } from './dto/create-hhrr-worker.dto';
import { UpdateHhrrWorkerDto } from './dto/update-hhrr-worker.dto';

@Injectable()
export class HhrrWorkersService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(userId: string, createHhrrWorkerDto: CreateHhrrWorkerDto){
        return this.prismaService.hhrrWorker.create({
            data: {
                ...createHhrrWorkerDto,
                created_by: userId
            }
        });
    }

    async getAll(userId: string){
        return this.prismaService.hhrrWorker.findMany({
            where: {created_by: userId}
        });
    }

    async getOne(userId: string, id: string){
        return this.prismaService.hhrrWorker.findUnique({
            where: {id: id, created_by: userId}
        });
    }

    async update(
        userId: string,
        id: string,
        updateHhrrWorkerDto: UpdateHhrrWorkerDto
    ){
        return this.prismaService.hhrrWorker.update({
            where: {id: id, created_by: userId},
            data: updateHhrrWorkerDto
        });
    }

    async delete(userId: string, id: string){
        return this.prismaService.hhrrWorker.delete({
            where: {id: id, created_by: userId}
        });
    }
}
