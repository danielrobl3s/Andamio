import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CataloguesService } from './catalogues.service';
import { CreateCatalogueDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';

@Controller('catalogues')
export class CataloguesController {

    constructor(
        private readonly cataloguesService: CataloguesService
    ){}

    @Get('/all')
    async getAllCatalogues(){
        return await this.cataloguesService.getAllCatalogues();
    }

    @Get('/catalogue/:id')
    async getCatalogueById(
        @Param('id') id: string
    ){
        return await this.cataloguesService.getCatalogueById(id);
    }

    @Post('/create')
    async createCatalogue(
        @Body() body: CreateCatalogueDto
    ){
        return await this.cataloguesService.createCatalogue(body);
    }

    @Patch('/update/:id')
    async updateCatalogue(
        @Param('id') id: string,
        @Body() body: UpdateCatalogueDto
    ){
        return await this.cataloguesService.updateCatalogue(id, body);
    }

    @Delete('/delete/:id')
    async deleteCatalogue(
        @Param('id') id: string
    ){
        return await this.cataloguesService.deleteCatalogue(id);
    }
}
