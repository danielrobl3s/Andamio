import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async getContracts(userId: string){
        return await this.prismaService.contract.findMany({
            where: {
                created_by: userId
            }
        });
    }


    async getContractById(id: string, userId: string){
        return await this.prismaService.contract.findUnique({
            where: {
                id: id,
                created_by: userId
            }
        })
    }


    async createContract(
        createContractDto: CreateContractDto,
        userId: string
    ){
        return await this.prismaService.contract.create({
            data: {
                ...createContractDto,
                created_by: userId
            }
        })
    }

    async updateContract(id: string, updateContractDto: UpdateContractDto, userId: string){
        return await this.prismaService.contract.update({
            where: {
                id: id,
                created_by: userId
            },
            data: updateContractDto
        })
    }

    async deleteContract(id: string, userId: string){
        return await this.prismaService.contract.delete({
            where: {
                id: id,
                created_by: userId
            }
        })
    }
}
