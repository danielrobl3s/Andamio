import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Session } from '@nestjs/common';
import { LaborService } from './labor.service';
import { CreateLaborDto } from './dto/create-labor.dto';
import { UpdateLaborDto } from './dto/update-labor.dto';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('labor')
export class LaborController {
    constructor(
        private readonly laborService: LaborService
    ){}


    @Post('/create')
    async createHhrrWorker(
        @Session() session: UserSession,
        @Body() body: CreateLaborDto
    ){
        const userId = session.user.id;
        return this.laborService.create(userId, body);
    }

    @Get('')
    async getAllHhrrWorkers(
        @Session() session: UserSession
    ){
        const userId = session.user.id;
        return this.laborService.getAll(userId);
    }

    @Get('/:id')
    async getHhrrWorkerById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id;
        return this.laborService.getOne(userId, id)
    }

    @Patch('/update/:id')
    async updateHhrrWorker(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateLaborDto
    ){
        const userId = session.user.id;
        return this.laborService.update(userId, id, body)
    }

    @Delete('/delete/:id')
    async deleteHhrrWorker(
        @Session() session: UserSession,
        @Param('id') id: string
    ){  
        const userId = session.user.id;
        return this.laborService.delete(userId, id)
    }
}
