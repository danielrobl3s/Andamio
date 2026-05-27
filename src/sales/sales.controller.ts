import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
        @Body() body: CreateSaleDto
    ){
        return this.salesService.create(body)
    }

    @Get('')
    async getAllSales(){
        return this.salesService.getAll();
    }

    @Get('/:id')
    async getSaleById(
        @Param('id') id: string
    ){
        return this.salesService.getOne(id);
    }

    @Patch('/update/:id')
    async updateSale(
        @Param('id') id: string,
        @Body() body: UpdateSaleDto
    ){
        return this.salesService.update(id, body);
    }

    @Delete('/delete/:id')
    async deleteSale(
        @Param('id') id: string
    ){
        return this.salesService.delete(id);
    }


}
