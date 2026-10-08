import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';

@Controller('materials')
export class MaterialsController {

    constructor(
        private readonly materialsService: MaterialsService
    ) {}


    
    @Get('/all')
    async getAllMaterials(){
        const materials = await this.materialsService.getAllMaterials();
        return materials;
    }


    @Get('/:id')
    async getMaterialById(@Param('id') id: string)
    {
        const material = await this.materialsService.getMaterialById(id);
        return material;
    }

    @Post('/create')
    async createMaterial(
        @Body() createMaterialDto: CreateMaterialDto
    ){
        const material = await this.materialsService.createMaterial(createMaterialDto);
        return material;
    }

}
