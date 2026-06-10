import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Session } from '@nestjs/common';
import { HhrrService } from './hhrr.service';
import { CreateHhrrDto } from './dto/create-hhrr.dto';
import { UpdateHhrrDto } from './dto/update-hhrr.dto';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('hhrr')
export class HhrrController {
    constructor(
        private readonly hhrrService: HhrrService
    ){}

    @Post('/create')
    async createHhrr(
        @Session() session: UserSession,
        @Body() body: CreateHhrrDto
    ){
        const userId = session.user.id
        return this.hhrrService.create(userId, body);
    }

    @Get('')
    async getAllHhrr(
        @Session() session: UserSession
    ){
        const userId = session.user.id
        return this.hhrrService.getAll(userId);
    }

    @Get('/:id')
    async getHhrrById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.hhrrService.getOne(userId, id);
    }

    @Patch('/update/:id')
    async updateHhrr(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateHhrrDto
    ){
        const userId = session.user.id
        return this.hhrrService.update(userId, id, body);
    }

    @Delete('/delete/:id')
    async deleteHhrr(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.hhrrService.delete(userId, id);
    }
}
