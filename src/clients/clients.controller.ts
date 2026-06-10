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
        @Body() body: CreateClientDto
    ){  
        const userId = req.user.id
        return this.clientsService.create(userId, body);
    }

    @Get('')
    @UseGuards(AuthGuard)
    async getAllClients(
        @Req() req: any
    )
    {
        const userId = req.user.id
        return this.clientsService.getAll(userId);
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getClientById(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.clientsService.getOne(userId, id);
    }

    @Patch('/update/:id')
    @UseGuards(AuthGuard)
    async updateClient(
        @Req() req: any,
        @Param('id') id: string,
        @Body() body: UpdateClientDto
    ){
        const userId = req.user.id
        return this.clientsService.update(userId, id, body);
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
