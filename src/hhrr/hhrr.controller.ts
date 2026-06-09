import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
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
        @Req() req: any,
        @Body() body: CreateHhrrDto
    ){
        const userId = req.user.id
        return this.hhrrService.create({...body, created_by: userId});
    }

    @Get('')
    async getAllHhrr(
        @Req() req: any
    ){
        const userId = req.user.id
        return this.hhrrService.getAll(userId);
    }

    @Get('/:id')
    async getHhrrById(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.hhrrService.getOne(userId, id);
    }

    @Patch('/update/:id')
    async updateHhrr(
        @Req() req: any,
        @Param('id') id: string,
        @Body() body: UpdateHhrrDto
    ){
        const userId = req.user.id
        return this.hhrrService.update(userId, id, body);
    }

    @Delete('/delete/:id')
    async deleteHhrr(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.hhrrService.delete(userId, id);
    }
}
