import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateClientDto } from '../clients/dto/update-client.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {

    constructor(
        private readonly salesService: SalesService
    ){}

    @Post('/create')
    async createSale(
        @Req() req: any,
        @Body() body: CreateSaleDto
    ){
        const userId = req.user.id
        return this.salesService.create(userId, body)
    }

    @Get('')
    async getAllSales(
        @Req() req: any
    ){
        const userId = req.user.id
        return this.salesService.getAll(userId);
    }

    @Get('/:id')
    async getSaleById(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.salesService.getOne(userId, id);
    }

    @Patch('/update/:id')
    async updateSale(
        @Req() req: any,
        @Param('id') id: string,
        @Body() body: UpdateSaleDto
    ){
        const userId = req.user.id
        return this.salesService.update(userId, id, body);
    }

    @Delete('/delete/:id')
    async deleteSale(
        @Req() req: any,
        @Param('id') id: string
    ){
        const userId = req.user.id
        return this.salesService.delete(userId, id);
    }


}
