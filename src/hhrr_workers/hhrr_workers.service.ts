import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHhrrWorkerDto } from './dto/create-hhrr-worker.dto';
import { UpdateHhrrWorkerDto } from './dto/update-hhrr-worker.dto';

@Injectable()
export class HhrrWorkersService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(createHhrrWorkerDto: CreateHhrrWorkerDto){
        return this.prismaService.hhrrWorker.create({
            data: createHhrrWorkerDto
        });
    }

    async getAll(){
        return this.prismaService.hhrrWorker.findMany();
    }

    async getOne(id: string){
        return this.prismaService.hhrrWorker.findUnique({
            where: {id: id}
        });
    }

    async update(
        id: string,
        updateHhrrWorkerDto: UpdateHhrrWorkerDto
    ){
        return this.prismaService.hhrrWorker.update({
            where: {id: id},
            data: updateHhrrWorkerDto
        });
    }

    async delete(id: string){
        return this.prismaService.hhrrWorker.delete({
            where: {id: id}
        });
    }
}
