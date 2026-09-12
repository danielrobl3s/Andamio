import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@UseGuards(AuthGuard)
@Controller('expenses')
export class ExpensesController {
    constructor(
        private readonly expensesService: ExpensesService
    ){}

    @Post('/create')
    async createHhrr(
        @Session() session: UserSession,
        @Body() body: CreateExpenseDto
    ){
        const userId = session.user.id
        return this.expensesService.create(userId, body);
    }

    @Get('')
    async getAllHhrr(
        @Session() session: UserSession,
        @Query('project_id') projectId?: string
    ){
        const userId = session.user.id
        return this.expensesService.getAll(userId, projectId);
    }

    @Get('/:id')
    async getHhrrById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.expensesService.getOne(userId, id);
    }

    @Patch('/update/:id')
    async updateHhrr(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateExpenseDto
    ){
        const userId = session.user.id
        return this.expensesService.update(userId, id, body);
    }

    @Delete('/delete/:id')
    async deleteHhrr(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.expensesService.delete(userId, id);
    }
}
