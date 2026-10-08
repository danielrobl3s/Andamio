import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {

    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async getAllMaterials(){
        const materials = await this.prismaService.material.findMany();
        return materials;
    }

    async getMaterialById(id: string){
        const material = await this.prismaService.material.findUnique({
            where: {
                id: id
            }
        })

        return material;
    }


    async createMaterial(createMaterialDto: CreateMaterialDto){
        const material = await this.prismaService.material.create({
            data: createMaterialDto
        });
        return material;
    }


    async updateMaterial(id: string, updateMaterialDto: UpdateMaterialDto){
        const material = await this.prismaService.material.update({
            where: {
                id: id
            },
            data: updateMaterialDto
        });

        return material;
    }

    async deleteMaterial(id: string){
        const material = await this.prismaService.material.delete({
            where: {
                id: id
            }
        });

        return material;
    }
}
