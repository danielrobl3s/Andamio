import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCatalogueDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';

@Injectable()
export class CataloguesService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async getAllCatalogues(){
        return await this.prismaService.catalogue.findMany();
    }


    async getCatalogueById(id: string){
        return await this.prismaService.catalogue.findUnique({
            where: {
                id: id
            }
        })
    }

    async createCatalogue(createCatalogueDto: CreateCatalogueDto){
        return await this.prismaService.catalogue.create({
            data: createCatalogueDto
        })
    }

    async updateCatalogue(id: string, updateCatalogueDto: UpdateCatalogueDto){
        return await this.prismaService.catalogue.update({
            where: {
                id: id
            },
            data: updateCatalogueDto
        })
    }

    async deleteCatalogue(id: string){
        return await this.prismaService.catalogue.delete({
            where: {
                id: id
            }
        })
    }
}
