import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@UseGuards(AuthGuard)
@Controller('vendors')
export class VendorsController {

    constructor(
        private readonly vendorsService: VendorsService
    ){}

    @Get('/all')
    async getAllVendors(
        @Session() session: UserSession
    ){
        return await this.vendorsService.getAllVendors(session.user.id);
    }

    @Get('/vendor/:id')
    async getVendorById(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        return await this.vendorsService.getVendorById(session.user.id, id);
    }

    @Post('/create')
    async createVendor(
        @Session() session: UserSession,
        @Body() body: CreateVendorDto
    ){
        return await this.vendorsService.createVendor(session.user.id, body);
    }

    @Patch('/update/:id')
    async updateVendor(
        @Session() session: UserSession,
        @Param('id') id: string,
        @Body() body: UpdateVendorDto
    ){
        return await this.vendorsService.updateVendor(session.user.id, id, body);
    }

    @Delete('/delete/:id')
    async deleteVendor(
        @Session() session: UserSession,
        @Param('id') id: string
    ){
        return await this.vendorsService.deleteVendor(session.user.id, id);
    }
}
