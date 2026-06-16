import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLaborDto } from './dto/create-labor.dto';
import { UpdateLaborDto } from './dto/update-labor.dto';

@Injectable()
export class LaborService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(userId: string, createlaborDto: CreateLaborDto){
        return this.prismaService.labor.create({
            data: {
                ...createlaborDto,
                created_by: userId
            }
        });
    }

    async getAll(userId: string){
        return this.prismaService.labor.findMany({
            where: {created_by: userId}
        });
    }

    async getOne(userId: string, id: string){
        return this.prismaService.labor.findUnique({
            where: {id: id, created_by: userId}
        });
    }

    async update(
        userId: string,
        id: string,
        updatelaborDto: UpdateLaborDto
    ){
        return this.prismaService.labor.update({
            where: {id: id, created_by: userId},
            data: updatelaborDto
        });
    }

    async delete(userId: string, id: string){
        return this.prismaService.labor.delete({
            where: {id: id, created_by: userId}
        });
    }
}
