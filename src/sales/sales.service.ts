import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(createSaleDto: CreateSaleDto){
        return this.prismaService.sales.create({
            data: createSaleDto
        });
    }

    async getAll(){
        return this.prismaService.sales.findMany();
    }

    async getOne(id: string){
        return this.prismaService.sales.findUnique({
            where: {id: id}
        })
    }

    async update(id: string, updateSaleDto: UpdateSaleDto){
        return this.prismaService.sales.update({
            where: {id: id},
            data: updateSaleDto
        });
    }

    async delete(id: string){
        return this.prismaService.sales.delete({
            where: {id: id}
        })
    }


}
