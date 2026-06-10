import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Session } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ModelName } from './interfaces/filters.types';
import { UpdateReportDto } from './dto/update-report.dto';
import { QueryDto } from './dto/query.dto';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService
    ){}

    @Post('/create')
    async createReport(
        @Session() session: UserSession,
        @Body() body: CreateReportDto<ModelName>
    ){
        const userId = session.user.id
        return this.reportsService.create(userId, body);
    }

    @Get('')
    async getAllReports(
        @Session() session: UserSession,
    ){
        const userId = session.user.id
        return this.reportsService.getAll(userId);
    }

    @Get('/:id')
    async getReportById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.reportsService.getOne(userId, id);
    }

    @Patch('/update/:id')
    async updateReport(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateReportDto
    ){
        const userId = session.user.id
        return this.reportsService.update(userId, id, body);
    }

    @Delete('/delete/:id')
    async deleteReport(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        const userId = session.user.id
        return this.reportsService.delete(userId, id);
    }

    @Get('/executeQuery/:id')
    async executeQueryFromReport(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: { modelName: ModelName }
    ){  
        const userId = session.user.id
        const report = await this.reportsService.getOne(userId, id);

        if (!report) throw new NotFoundException('Report not found :(')

        return await this.reportsService.executeQuery(
            report.model as ModelName,
            report.query as unknown as QueryDto<ModelName>
        )


    }
}
