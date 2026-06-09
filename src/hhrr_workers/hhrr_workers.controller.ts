import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { HhrrWorkersService } from './hhrr_workers.service';
import { CreateHhrrWorkerDto } from './dto/create-hhrr-worker.dto';
import { UpdateHhrrWorkerDto } from './dto/update-hhrr-worker.dto';

@Controller('hhrr-workers')
export class HhrrWorkersController {
    constructor(
        private readonly hhrrWorkersService: HhrrWorkersService
    ){}


    @Post('/create')
    async createHhrrWorker(
        @Req() req: any,
        @Body() body: CreateHhrrWorkerDto
    ){
        const userId = req.user.id;
        return this.hhrrWorkersService.create(userId, body);
    }

    @Get('')
    async getAllHhrrWorkers(
        @Req() req: any
    ){
        const userId = req.user.id;
        return this.hhrrWorkersService.getAll(userId);
    }

    @Get('/:id')
    async getHhrrWorkerById(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id;
        return this.hhrrWorkersService.getOne(userId, id)
    }

    @Patch('/update/:id')
    async updateHhrrWorker(
        @Req() req: any,
        @Param('id') id: string,
        @Body() body: UpdateHhrrWorkerDto
    ){
        const userId = req.user.id;
        return this.hhrrWorkersService.update(userId, id, body)
    }

    @Delete('/delete/:id')
    async deleteHhrrWorker(
        @Req() req: any,
        @Param('id') id: string
    ){  
        const userId = req.user.id;
        return this.hhrrWorkersService.delete(userId, id)
    }
}
