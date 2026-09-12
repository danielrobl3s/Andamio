import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(userId: string, createHhrrDto: CreateExpenseDto){
        return this.prismaService.expenses.create({
            data: {
                ...createHhrrDto,
                created_by: userId
            }
        });
    }

    async getAll(userId: string, projectId?: string){
        return this.prismaService.expenses.findMany({
            where: {
                created_by: userId,
                project_id: projectId
            }
        });
    }

    async getOne(userId: string, id: string){
        return this.prismaService.expenses.findUnique({
            where: {id: id, created_by: userId}
        });
    }

    async update(userId: string, id: string, updateHhrrDto: UpdateExpenseDto){
        return this.prismaService.expenses.update({
            where: {id: id, created_by: userId},
            data: updateHhrrDto
        });
    }

    async delete(userId: string, id: string){
        return this.prismaService.expenses.delete({
            where: {id: id, created_by: userId}
        });
    }

}
