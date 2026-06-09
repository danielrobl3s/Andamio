import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHhrrDto } from './dto/create-hhrr.dto';
import { UpdateHhrrDto } from './dto/update-hhrr.dto';

@Injectable()
export class HhrrService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(createHhrrDto: CreateHhrrDto){
        return this.prismaService.hhrr.create({
            data: createHhrrDto
        });
    }

    async getAll(userId: string){
        return this.prismaService.hhrr.findMany({
            where: {
                created_by: userId
            }
        });
    }

    async getOne(userId: string, id: string){
        return this.prismaService.hhrr.findUnique({
            where: {id: id, created_by: userId}
        });
    }

    async update(userId: string, id: string, updateHhrrDto: UpdateHhrrDto){
        return this.prismaService.hhrr.update({
            where: {id: id, created_by: userId},
            data: updateHhrrDto
        });
    }

    async delete(userId: string, id: string){
        return this.prismaService.hhrr.delete({
            where: {id: id, created_by: userId}
        });
    }

}
