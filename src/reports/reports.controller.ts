import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ModelName } from './interfaces/filters.types';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService
    ){}

    @Post('/create')
    async createReport(
        @Body() body: CreateReportDto<ModelName>
    ){
        return this.reportsService.create(body);
    }
}
