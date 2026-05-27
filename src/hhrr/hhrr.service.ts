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

    async getAll(){
        return this.prismaService.hhrr.findMany();
    }

    async getOne(id: string){
        return this.prismaService.hhrr.findUnique({
            where: {id: id}
        });
    }

    async update(id: string, updateHhrrDto: UpdateHhrrDto){
        return this.prismaService.hhrr.update({
            where: {id: id},
            data: updateHhrrDto
        });
    }

    async delete(id: string){
        return this.prismaService.hhrr.delete({
            where: {id: id}
        });
    }

}
