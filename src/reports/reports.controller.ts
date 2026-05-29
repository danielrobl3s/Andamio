import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ModelName } from './interfaces/filters.types';
import { UpdateReportDto } from './dto/update-report.dto';

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

    @Get('')
    async getAllReports(){
        return this.reportsService.getAll();
    }

    @Get('/:id')
    async getReportById(
        @Param('id') id: string
    ){
        return this.reportsService.getOne(id);
    }

    @Patch('/update/:id')
    async updateReport(
        @Param('id') id: string,
        @Body() body: UpdateReportDto
    ){
        return this.reportsService.update(id, body);
    }

    @Delete('/delete/:id')
    async deleteReport(
        @Param('id') id: string
    ){
        return this.reportsService.delete(id);
    }
}
