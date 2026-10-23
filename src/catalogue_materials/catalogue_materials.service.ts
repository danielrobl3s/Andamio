import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCatalogueMaterialDto } from './dto/create-catalogue_material.dto';
import { UpdateCatalogueMaterialDto } from './dto/update-catalogue_material.dto';

@Injectable()
export class CatalogueMaterialsService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    private async assertCatalogueOwned(userId: string, catalogueId: string){
        const catalogue = await this.prismaService.catalogue.findFirst({
            where: {id: catalogueId, created_by: userId}
        });
        if (!catalogue) {
            throw new BadRequestException('catalogue_id does not match one of your catalogues');
        }
    }


    async getAllCatalogueMaterials(userId: string){
        return await this.prismaService.catalogueMaterial.findMany({
            where: {created_by: userId}
        });
    }


    async getCatalogueMaterialById(userId: string, id: string){
        return await this.prismaService.catalogueMaterial.findUnique({
            where: {
                id: id,
                created_by: userId
            }
        })
    }

    async createCatalogueMaterial(userId: string, createCatalogueMaterialDto: CreateCatalogueMaterialDto){
        await this.assertCatalogueOwned(userId, createCatalogueMaterialDto.catalogue_id);
        return await this.prismaService.catalogueMaterial.create({
            data: {
                ...createCatalogueMaterialDto,
                created_by: userId
            }
        })
    }

    async updateCatalogueMaterial(userId: string, id: string, updateCatalogueMaterialDto: UpdateCatalogueMaterialDto){
        if (updateCatalogueMaterialDto.catalogue_id) {
            await this.assertCatalogueOwned(userId, updateCatalogueMaterialDto.catalogue_id);
        }
        return await this.prismaService.catalogueMaterial.update({
            where: {
                id: id,
                created_by: userId
            },
            data: updateCatalogueMaterialDto
        })
    }

    async deleteCatalogueMaterial(userId: string, id: string){
        return await this.prismaService.catalogueMaterial.delete({
            where: {
                id: id,
                created_by: userId
            }
        })
    }
}
