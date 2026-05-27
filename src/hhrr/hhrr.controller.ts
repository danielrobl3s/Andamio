import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HhrrService } from './hhrr.service';
import { CreateHhrrDto } from './dto/create-hhrr.dto';
import { UpdateHhrrDto } from './dto/update-hhrr.dto';

@Controller('hhrr')
export class HhrrController {
    constructor(
        private readonly hhrrService: HhrrService
    ){}

    @Post('/create')
    async createHhrr(
        @Body() body: CreateHhrrDto
    ){
        return this.hhrrService.create(body);
    }

    @Get('')
    async getAllHhrr(){
        return this.hhrrService.getAll();
    }

    @Get('/:id')
    async getHhrrById(
        @Param('id') id: string
    ){
        return this.hhrrService.getOne(id);
    }

    @Patch('/update/:id')
    async updateHhrr(
        @Param('id') id: string,
        @Body() body: UpdateHhrrDto
    ){
        return this.hhrrService.update(id, body);
    }

    @Delete('/delete/:id')
    async deleteHhrr(
        @Param('id') id: string
    ){
        return this.hhrrService.delete(id);
    }
}
