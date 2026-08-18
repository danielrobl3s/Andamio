import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientLogDto } from './dto/create-client_log.dto';
import { UpdateClientLogDto } from './dto/update-client_log.dto';

@Injectable()
export class ClientLogsService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async getClientLogs(userId: string) {
        return await this.prismaService.clientLog.findMany({
            where: {
                created_by: userId}
        });
    }


    async getClientLogById(userId: string, logId: string) {
        return await this.prismaService.clientLog.findUnique({
            where: {
                id: logId,
                created_by: userId
            }
        });
    }


    async createClientLog(userId: string, data: CreateClientLogDto) {
        return await this.prismaService.clientLog.create({
            data: {
                ...data,
                created_by: userId
            }
        });
    }

    async updateClientLog(userId: string, logId: string, data: UpdateClientLogDto) {
        return await this.prismaService.clientLog.update({
            where: {
                id: logId,
                created_by: userId
            },
            data: {
                ...data
            }
        });
    }

    async deleteClientLog(userId: string, logId: string) {
        return await this.prismaService.clientLog.delete({
            where: {
                id: logId,
                created_by: userId
            }
        });
    }
}
