import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CataloguesService } from './catalogues.service';
import { CreateCatalogueDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';

@UseGuards(AuthGuard)
@Controller('catalogues')
export class CataloguesController {

    constructor(
        private readonly cataloguesService: CataloguesService
    ){}

    @Get('/all')
    async getAllCatalogues(
        @Session() session: UserSession
    ){
        return await this.cataloguesService.getAllCatalogues(session.user.id);
    }

    @Get('/catalogue/:id')
    async getCatalogueById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        return await this.cataloguesService.getCatalogueById(session.user.id, id);
    }

    @Post('/create')
    async createCatalogue(
        @Session() session: UserSession,
        @Body() body: CreateCatalogueDto
    ){
        return await this.cataloguesService.createCatalogue(session.user.id, body);
    }

    @Patch('/update/:id')
    async updateCatalogue(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateCatalogueDto
    ){
        return await this.cataloguesService.updateCatalogue(session.user.id, id, body);
    }

    @Delete('/delete/:id')
    async deleteCatalogue(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        return await this.cataloguesService.deleteCatalogue(session.user.id, id);
    }
}
