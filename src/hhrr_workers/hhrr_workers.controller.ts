import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Session } from '@nestjs/common';
import { HhrrWorkersService } from './hhrr_workers.service';
import { CreateHhrrWorkerDto } from './dto/create-hhrr-worker.dto';
import { UpdateHhrrWorkerDto } from './dto/update-hhrr-worker.dto';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('hhrr-workers')
export class HhrrWorkersController {
    constructor(
        private readonly hhrrWorkersService: HhrrWorkersService
    ){}


    @Post('/create')
    async createHhrrWorker(
        @Session() session: UserSession,
        @Body() body: CreateHhrrWorkerDto
    ){
        const userId = session.user.id;
        return this.hhrrWorkersService.create(userId, body);
    }

    @Get('')
    async getAllHhrrWorkers(
        @Session() session: UserSession
    ){
        const userId = session.user.id;
        return this.hhrrWorkersService.getAll(userId);
    }

    @Get('/:id')
    async getHhrrWorkerById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id;
        return this.hhrrWorkersService.getOne(userId, id)
    }

    @Patch('/update/:id')
    async updateHhrrWorker(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateHhrrWorkerDto
    ){
        const userId = session.user.id;
        return this.hhrrWorkersService.update(userId, id, body)
    }

    @Delete('/delete/:id')
    async deleteHhrrWorker(
        @Session() session: UserSession,
        @Param('id') id: string
    ){  
        const userId = session.user.id;
        return this.hhrrWorkersService.delete(userId, id)
    }
}
