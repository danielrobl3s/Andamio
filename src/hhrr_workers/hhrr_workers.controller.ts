import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
        @Body() body: CreateHhrrWorkerDto
    ){
        return this.hhrrWorkersService.create(body);
    }

    @Get('')
    async getAllHhrrWorkers(){
        return this.hhrrWorkersService.getAll();
    }

    @Get('/:id')
    async getHhrrWorkerById(
        @Param('id') id: string
    ){
        return this.hhrrWorkersService.getOne(id)
    }

    @Patch('/update/:id')
    async updateHhrrWorker(
        @Param('id') id: string,
        @Body() body: UpdateHhrrWorkerDto
    ){
        return this.hhrrWorkersService.update(id, body)
    }

    @Delete('/delete/:id')
    async deleteHhrrWorker(
        @Param('id') id: string
    ){
        return this.hhrrWorkersService.delete(id)
    }
}
