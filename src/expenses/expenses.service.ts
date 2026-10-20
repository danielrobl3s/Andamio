import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseKind } from './interfaces/enums.interface';

@Injectable()
export class ExpensesService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    // A labor payment must identify who was paid: a registered worker or a typed-in name.
    private assertLaborHasWorker(kind: string | undefined, workerId?: string | null, workerName?: string | null){
        if (kind === ExpenseKind.labor && !workerId && !workerName?.trim()) {
            throw new BadRequestException('worker_id or worker_name is required when kind is labor');
        }
    }

    async create(userId: string, createHhrrDto: CreateExpenseDto){
        this.assertLaborHasWorker(createHhrrDto.kind, createHhrrDto.worker_id, createHhrrDto.worker_name);

        // Safety net: snapshot the worker's name so the payment keeps it if the Labor row is deleted
        let workerSnapshot = {};
        if (createHhrrDto.worker_id && !createHhrrDto.worker_name?.trim()) {
            const worker = await this.prismaService.labor.findUnique({
                where: {id: createHhrrDto.worker_id, created_by: userId}
            });
            if (!worker) {
                throw new BadRequestException('worker_id does not match a registered worker');
            }
            workerSnapshot = {
                worker_name: worker.worker_name,
                worker_lastname: createHhrrDto.worker_lastname ?? worker.worker_lastname,
                phone_number: createHhrrDto.phone_number ?? worker.phone
            };
        }

        return this.prismaService.expenses.create({
            data: {
                ...createHhrrDto,
                ...workerSnapshot,
                created_by: userId
            }
        });
    }

    async getAll(userId: string, projectId?: string, kind?: ExpenseKind){
        return this.prismaService.expenses.findMany({
            where: {
                created_by: userId,
                project_id: projectId,
                kind: kind
            }
        });
    }

    async getOne(userId: string, id: string){
        return this.prismaService.expenses.findUnique({
            where: {id: id, created_by: userId}
        });
    }

    async update(userId: string, id: string, updateHhrrDto: UpdateExpenseDto){
        // Validate the resulting row, not just the patch, so PATCH { amount } on a labor expense still works
        const existing = await this.prismaService.expenses.findUnique({
            where: {id: id, created_by: userId}
        });
        if (existing) {
            this.assertLaborHasWorker(
                updateHhrrDto.kind ?? existing.kind,
                updateHhrrDto.worker_id !== undefined ? updateHhrrDto.worker_id : existing.worker_id,
                updateHhrrDto.worker_name !== undefined ? updateHhrrDto.worker_name : existing.worker_name
            );
        }
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
