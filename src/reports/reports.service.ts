import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ModelName } from './interfaces/filters.types';
import { InputJsonValue } from '@prisma/client/runtime/binary';
import { QueryDto } from './dto/query.dto';

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
            query: createdReport.query as unknown as QueryDto<ModelName>
        }
    }
}
