import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {

    constructor(
        private readonly prismaService: PrismaService
    ) {}

    private async assertCatalogueMaterialOwned(userId: string, catalogueMaterialId: string){
        const catalogueMaterial = await this.prismaService.catalogueMaterial.findFirst({
            where: {id: catalogueMaterialId, created_by: userId}
        });
        if (!catalogueMaterial) {
            throw new BadRequestException('catalogue_material_id does not match one of your catalogue materials');
        }
    }


    async getAllMaterials(userId: string){
        const materials = await this.prismaService.material.findMany({
            where: {created_by: userId}
        });
        return materials;
    }

    async getMaterialById(userId: string, id: string){
        const material = await this.prismaService.material.findUnique({
            where: {
                id: id,
                created_by: userId
            }
        })

        return material;
    }


    async createMaterial(userId: string, createMaterialDto: CreateMaterialDto){
        if (createMaterialDto.catalogue_material_id) {
            await this.assertCatalogueMaterialOwned(userId, createMaterialDto.catalogue_material_id);
        }
        const material = await this.prismaService.material.create({
            data: {
                ...createMaterialDto,
                created_by: userId
            }
        });
        return material;
    }


    async updateMaterial(userId: string, id: string, updateMaterialDto: UpdateMaterialDto){
        if (updateMaterialDto.catalogue_material_id) {
            await this.assertCatalogueMaterialOwned(userId, updateMaterialDto.catalogue_material_id);
        }
        const material = await this.prismaService.material.update({
            where: {
                id: id,
                created_by: userId
            },
            data: updateMaterialDto
        });

        return material;
    }

    async deleteMaterial(userId: string, id: string){
        const material = await this.prismaService.material.delete({
            where: {
                id: id,
                created_by: userId
            }
        });

        return material;
    }
}
