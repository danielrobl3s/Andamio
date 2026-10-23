import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CatalogueMaterialsService } from './catalogue_materials.service';
import { CreateCatalogueMaterialDto } from './dto/create-catalogue_material.dto';
import { UpdateCatalogueMaterialDto } from './dto/update-catalogue_material.dto';

@UseGuards(AuthGuard)
@Controller('catalogue-materials')
export class CatalogueMaterialsController {

    constructor(
        private readonly catalogueMaterialsService: CatalogueMaterialsService
    ){}

    @Get('/all')
    async getAllCatalogueMaterials(
        @Session() session: UserSession
    ){
        return await this.catalogueMaterialsService.getAllCatalogueMaterials(session.user.id);
    }

    @Get('/catalogue-material/:id')
    async getCatalogueMaterialById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        return await this.catalogueMaterialsService.getCatalogueMaterialById(session.user.id, id);
    }

    @Post('/create')
    async createCatalogueMaterial(
        @Session() session: UserSession,
        @Body() body: CreateCatalogueMaterialDto
    ){
        return await this.catalogueMaterialsService.createCatalogueMaterial(session.user.id, body);
    }

    @Patch('/update/:id')
    async updateCatalogueMaterial(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateCatalogueMaterialDto
    ){
        return await this.catalogueMaterialsService.updateCatalogueMaterial(session.user.id, id, body);
    }

    @Delete('/delete/:id')
    async deleteCatalogueMaterial(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        return await this.catalogueMaterialsService.deleteCatalogueMaterial(session.user.id, id);
    }
}
