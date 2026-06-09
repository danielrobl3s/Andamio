import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(userId: string, createSaleDto: CreateSaleDto){
        return this.prismaService.sales.create({
            data: {
                ...createSaleDto,
                created_by: userId
            }
        });
    }

    async getAll(userId: string){
        return this.prismaService.sales.findMany({
            where: {
                created_by: userId
            }
        });
    }

    async getOne(userId: string, id: string){
        return this.prismaService.sales.findUnique({
            where: {id: id, created_by: userId}
        })
    }

    async update(userId: string, id: string, updateSaleDto: UpdateSaleDto){
        return this.prismaService.sales.update({
            where: {id: id, created_by: userId},
            data: updateSaleDto
        });
    }

    async delete(userId: string, id: string){
        return this.prismaService.sales.delete({
            where: {id: id, created_by: userId}
        })
    }


}
