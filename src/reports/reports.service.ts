import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ModelName } from './interfaces/filters.types';
import { InputJsonValue } from '@prisma/client/runtime/binary';
import { QueryDto } from './dto/query.dto';
import { Query } from './interfaces/query.interface';
import { timingSafeEqual } from 'crypto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(
        createReportDto: CreateReportDto<ModelName>
    ){
        const createdReport = await this.prismaService.report.create({
            data: {
                ...createReportDto,
                query: createReportDto.query as unknown as InputJsonValue
            }
        });
        

        return {
            ...createdReport,
            query: createdReport.query as unknown as Query
        }
    }

    async getAll(){
        return this.prismaService.report.findMany();
    }

    async getOne(id: string){
        return this.prismaService.report.findUnique({
            where: {id: id}
        });
    }

    async update(id: string, updateReportDto: UpdateReportDto){
        const updatedReport = await this.prismaService.report.update({
            where: {id: id},
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

    async delete(id: string){
        return this.prismaService.report.delete({
            where: {id: id}
        })
    }
}
