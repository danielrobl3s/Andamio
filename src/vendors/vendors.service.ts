import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async getAllVendors(userId: string){
        return await this.prismaService.vendor.findMany({
            where: {created_by: userId}
        });
    }


    async getVendorById(userId: string, id: string){
        return await this.prismaService.vendor.findUnique({
            where: {
                id: id,
                created_by: userId
            }
        })
    }

    async createVendor(userId: string, createVendorDto: CreateVendorDto){
        return await this.prismaService.vendor.create({
            data: {
                ...createVendorDto,
                created_by: userId
            }
        })
    }

    async updateVendor(userId: string, id: string, updateVendorDto: UpdateVendorDto){
        return await this.prismaService.vendor.update({
            where: {
                id: id,
                created_by: userId
            },
            data: updateVendorDto
        })
    }

    async deleteVendor(userId: string, id: string){
        return await this.prismaService.vendor.delete({
            where: {
                id: id,
                created_by: userId
            }
        })
    }
}
