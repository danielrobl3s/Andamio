import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ModelName, PrismaDelegate } from './interfaces/filters.types';
import { InputJsonValue } from '@prisma/client/runtime/binary';
import { QueryDto } from './dto/query.dto';
import { Query } from './interfaces/query.interface';
import { timingSafeEqual } from 'crypto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Mode } from 'fs';

@Injectable()
export class ReportsService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    private getDelegate(
        model: ModelName
    ){
        return (this.prismaService as unknown as Record<ModelName, PrismaDelegate>)[model]
    }

    async create(
        userId: string,
        createReportDto: CreateReportDto<ModelName>
    ){
        const createdReport = await this.prismaService.report.create({
            data: {
                ...createReportDto,
                query: createReportDto.query as unknown as InputJsonValue,
                created_by: userId
            }
        });
        

        return {
            ...createdReport,
            query: createdReport.query as unknown as Query
        }
    }

    async getAll(
        userId: string
    ){
        return this.prismaService.report.findMany({
            where: {
                created_by: userId
            }
        });
    }

    async getOne(userId: string, id: string){
        return this.prismaService.report.findUnique({
            where: {id: id, created_by: userId}
        });
    }

    async update(userId: string, id: string, updateReportDto: UpdateReportDto){
        const updatedReport = await this.prismaService.report.update({
            where: {id: id, created_by: userId},
            data: {
                ...updateReportDto,
                query: updateReportDto.query as unknown as InputJsonValue
            }
        });

        return {
            ...updatedReport,
            query: updatedReport.query as unknown as Query
        }
    }

    async delete(userId: string, id: string){
        return this.prismaService.report.delete({
            where: {id: id, created_by: userId}
        })
    }

    async executeQuery(
        model: ModelName, query: QueryDto<ModelName>
    ){
        const delegate = this.getDelegate(model)

        return delegate.findMany(query);
    }
    
}
