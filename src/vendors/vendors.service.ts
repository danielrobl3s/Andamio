import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async getAllVendors(){
        return await this.prismaService.vendor.findMany();
    }


    async getVendorById(id: string){
        return await this.prismaService.vendor.findUnique({
            where: {
                id: id
            }
        })
    }

    async createVendor(createVendorDto: CreateVendorDto){
        return await this.prismaService.vendor.create({
            data: createVendorDto
        })
    }

    async updateVendor(id: string, updateVendorDto: UpdateVendorDto){
        return await this.prismaService.vendor.update({
            where: {
                id: id
            },
            data: updateVendorDto
        })
    }

    async deleteVendor(id: string){
        return await this.prismaService.vendor.delete({
            where: {
                id: id
            }
        })
    }
}
