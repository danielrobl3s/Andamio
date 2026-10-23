import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCatalogueDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';

@Injectable()
export class CataloguesService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    private async assertVendorOwned(userId: string, vendorId: string){
        const vendor = await this.prismaService.vendor.findFirst({
            where: {id: vendorId, created_by: userId}
        });
        if (!vendor) {
            throw new BadRequestException('vendor_id does not match one of your vendors');
        }
    }


    async getAllCatalogues(userId: string){
        return await this.prismaService.catalogue.findMany({
            where: {created_by: userId}
        });
    }


    async getCatalogueById(userId: string, id: string){
        return await this.prismaService.catalogue.findUnique({
            where: {
                id: id,
                created_by: userId
            }
        })
    }

    async createCatalogue(userId: string, createCatalogueDto: CreateCatalogueDto){
        await this.assertVendorOwned(userId, createCatalogueDto.vendor_id);
        return await this.prismaService.catalogue.create({
            data: {
                ...createCatalogueDto,
                created_by: userId
            }
        })
    }

    async updateCatalogue(userId: string, id: string, updateCatalogueDto: UpdateCatalogueDto){
        if (updateCatalogueDto.vendor_id) {
            await this.assertVendorOwned(userId, updateCatalogueDto.vendor_id);
        }
        return await this.prismaService.catalogue.update({
            where: {
                id: id,
                created_by: userId
            },
            data: updateCatalogueDto
        })
    }

    async deleteCatalogue(userId: string, id: string){
        return await this.prismaService.catalogue.delete({
            where: {
                id: id,
                created_by: userId
            }
        })
    }
}
