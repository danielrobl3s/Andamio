import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@UseGuards(AuthGuard)
@Controller('materials')
export class MaterialsController {

    constructor(
        private readonly materialsService: MaterialsService
    ) {}


    
    @Get('/all')
    async getAllMaterials(
        @Session() session: UserSession
    ){
        const materials = await this.materialsService.getAllMaterials(session.user.id);
        return materials;
    }


    @Get('/:id')
    async getMaterialById(
        @Session() session: UserSession,
        @Param('id') id: string
    )
    {
        const material = await this.materialsService.getMaterialById(session.user.id, id);
        return material;
    }

    @Post('/create')
    async createMaterial(
        @Session() session: UserSession,
        @Body() createMaterialDto: CreateMaterialDto
    ){
        const material = await this.materialsService.createMaterial(session.user.id, createMaterialDto);
        return material;
    }

    @Patch('/:id')
    async updateMaterial(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() updateMaterialDto: UpdateMaterialDto
    ){
        const material = await this.materialsService.updateMaterial(session.user.id, id, updateMaterialDto);
        return material;
    }

    @Delete('/:id')
    async deleteMaterial(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const material = await this.materialsService.deleteMaterial(session.user.id, id);
        return material;
    }

}
