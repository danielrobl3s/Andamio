import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {

    constructor(
        private readonly clientsService: ClientsService
    ){}

    @Post('/create')
    async createClient(
        @Body() body: CreateClientDto
    ){
        return this.clientsService.create(body);
    }

    @Get('')
    async getAllClients()
    {
        return this.clientsService.getAll();
    }

    @Get('/:id')
    async getClientById(
        @Param('id') id: string
    ){
        return this.clientsService.getOne(id);
    }

    @Patch('/update/:id')
    async updateClient(
        @Param('id') id: string,
        @Body() body: UpdateClientDto
    ){
        return this.clientsService.update(id, body);
    }

    @Delete('/delete/:id')
    async deleteClient(
        @Param('id') id: string
    ){
        return this.clientsService.delete(id);
    }

}
