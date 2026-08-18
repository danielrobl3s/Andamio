import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@Controller('clients')
export class ClientsController {

    constructor(
        private readonly clientsService: ClientsService
    ){}

    @Post('/create')
    @UseGuards(AuthGuard)
    async createClient(
        @Req() req: any,
        @Param('project_id') projectId: string,
        @Body() body: CreateClientDto
    ){  
        const userId = req.user.id
        return this.clientsService.create(userId, projectId, body);
    }

    @Get('')
    @UseGuards(AuthGuard)
    async getAllClients(
        @Req() req: any,
        @Param('project_id') projectId: string
    )
    {
        const userId = req.user.id
        return this.clientsService.getAll(userId, projectId);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getClientById(
        @Req() req: any,
        @Param('id') id: string,
        @Param('project_id') projectId: string
    ){
        const userId = req.user.id
        return this.clientsService.getOne(userId, id, projectId);
    }

    @Patch('/update/:id')
    @UseGuards(AuthGuard)
    async updateClient(
        @Req() req: any,
        @Param('id') id: string,
        @Param('project_id') projectId: string,
        @Body() body: UpdateClientDto
    ){
        const userId = req.user.id
        return this.clientsService.update(userId, id, body, projectId);
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard)
    async deleteClient(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.clientsService.delete(userId, id);
    }

}
