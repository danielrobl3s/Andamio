import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CatalogueMaterialsService } from './catalogue_materials.service';
import { CreateCatalogueMaterialDto } from './dto/create-catalogue_material.dto';
import { UpdateCatalogueMaterialDto } from './dto/update-catalogue_material.dto';

@Controller('catalogue-materials')
export class CatalogueMaterialsController {

    constructor(
        private readonly catalogueMaterialsService: CatalogueMaterialsService
    ){}

    @Get('/all')
    async getAllCatalogueMaterials(){
        return await this.catalogueMaterialsService.getAllCatalogueMaterials();
    }

    @Get('/catalogue-material/:id')
    async getCatalogueMaterialById(
        @Param('id') id: string
    ){
        return await this.catalogueMaterialsService.getCatalogueMaterialById(id);
    }

    @Post('/create')
    async createCatalogueMaterial(
        @Body() body: CreateCatalogueMaterialDto
    ){
        return await this.catalogueMaterialsService.createCatalogueMaterial(body);
    }

    @Patch('/update/:id')
    async updateCatalogueMaterial(
        @Param('id') id: string,
        @Body() body: UpdateCatalogueMaterialDto
    ){
        return await this.catalogueMaterialsService.updateCatalogueMaterial(id, body);
    }

    @Delete('/delete/:id')
    async deleteCatalogueMaterial(
        @Param('id') id: string
    ){
        return await this.catalogueMaterialsService.deleteCatalogueMaterial(id);
    }
}
