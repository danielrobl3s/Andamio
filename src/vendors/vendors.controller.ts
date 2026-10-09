import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendors')
export class VendorsController {

    constructor(
        private readonly vendorsService: VendorsService
    ){}

    @Get('/all')
    async getAllVendors(){
        return await this.vendorsService.getAllVendors();
    }

    @Get('/vendor/:id')
    async getVendorById(
        @Param('id') id: string
    ){
        return await this.vendorsService.getVendorById(id);
    }

    @Post('/create')
    async createVendor(
        @Body() body: CreateVendorDto
    ){
        return await this.vendorsService.createVendor(body);
    }

    @Patch('/update/:id')
    async updateVendor(
        @Param('id') id: string,
        @Body() body: UpdateVendorDto
    ){
        return await this.vendorsService.updateVendor(id, body);
    }

    @Delete('/delete/:id')
    async deleteVendor(
        @Param('id') id: string
    ){
        return await this.vendorsService.deleteVendor(id);
    }
}
