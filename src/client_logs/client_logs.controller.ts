import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { ClientLogsService } from './client_logs.service';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CreateClientLogDto } from './dto/create-client_log.dto';


@Controller('client-logs')
export class ClientLogsController {
    constructor(
        private readonly clientLogsService: ClientLogsService
    ) {}


    @Get('')
    async getClientLogs(
        @Session() session: UserSession,
        @Query('contract_id') contractId?: string,
    ){
        const userId = session.user.id;
        return await this.clientLogsService.getClientLogs(userId, contractId);
    }


    @Get('/:id')
    async getClientLogById(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Query('contract_id') contractId?: string,
    ){
        const userId = session.user.id;
        return await this.clientLogsService.getClientLogById(userId, id, contractId);
    }


    @Post('/create')
    async createClientLog(
        @Session() session: UserSession,
        @Body() data: CreateClientLogDto
    ){
        const userId = session.user.id;
        return await this.clientLogsService.createClientLog(userId, data);
    }
    

    @Patch('/update/:id')
    async updateClientLog(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() data: CreateClientLogDto
    ){
        const userId = session.user.id;
        return await this.clientLogsService.updateClientLog(userId, id, data);
    }


    @Delete('/delete/:id')
    async deleteClientLog(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id;
        return await this.clientLogsService.deleteClientLog(userId, id);
    }

}