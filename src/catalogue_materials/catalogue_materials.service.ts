import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCatalogueMaterialDto } from './dto/create-catalogue_material.dto';
import { UpdateCatalogueMaterialDto } from './dto/update-catalogue_material.dto';

@Injectable()
export class CatalogueMaterialsService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async getAllCatalogueMaterials(){
        return await this.prismaService.catalogueMaterial.findMany();
    }


    async getCatalogueMaterialById(id: string){
        return await this.prismaService.catalogueMaterial.findUnique({
            where: {
                id: id
            }
        })
    }

    async createCatalogueMaterial(createCatalogueMaterialDto: CreateCatalogueMaterialDto){
        return await this.prismaService.catalogueMaterial.create({
            data: createCatalogueMaterialDto
        })
    }

    async updateCatalogueMaterial(id: string, updateCatalogueMaterialDto: UpdateCatalogueMaterialDto){
        return await this.prismaService.catalogueMaterial.update({
            where: {
                id: id
            },
            data: updateCatalogueMaterialDto
        })
    }

    async deleteCatalogueMaterial(id: string){
        return await this.prismaService.catalogueMaterial.delete({
            where: {
                id: id
            }
        })
    }
}
