import { Body, Controller, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
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
    ) {
        const userId = session.user.id;
        return await this.contractsService.getContracts(userId);
    }

    @Get('/:id')
    async getContractById(
        @Session() session: UserSession,
        @Param('id') id: string
    ) {
        const userId = session.user.id;
        return await this.contractsService.getContractById(id, userId);
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
}
