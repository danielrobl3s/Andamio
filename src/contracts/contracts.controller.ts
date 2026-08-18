import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@UseGuards(AuthGuard)
@Controller('contracts')
export class ContractsController {

    constructor(
        private readonly contractsService: ContractsService
    ) {}


    @Get('/')
    async getContracts(
        @Session() session: UserSession,
        @Query() clientId?: string,
    ) {
        const userId = session.user.id;
        return await this.contractsService.getContracts(userId, clientId);
    }

    @Get('/:id')
    async getContractById(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Query() clientId?: string,
    ) {
        const userId = session.user.id;
        return await this.contractsService.getContractById(id, userId, clientId);
    }

    @Post('/create')
    async createContract(
        @Session() session: UserSession,
        @Body() data: CreateContractDto
    ){
        const userId = session.user.id;
        return await this.contractsService.createContract(data, userId);
    }

    @Patch('/update/:id')
    async updateContract(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() data: UpdateContractDto
    ){
        const userId = session.user.id;
        return await this.contractsService.updateContract(id, data, userId);
    }


    @Delete('/delete/:id')
    async deleteContract(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id;
        return await this.contractsService.deleteContract(id, userId);
    }
}
