import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [VendorsController],
  providers: [VendorsService, PrismaService]
})
export class VendorsModule {}
