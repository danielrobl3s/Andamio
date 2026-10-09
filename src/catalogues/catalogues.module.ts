import { Module } from '@nestjs/common';
import { CataloguesController } from './catalogues.controller';
import { CataloguesService } from './catalogues.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CataloguesController],
  providers: [CataloguesService, PrismaService]
})
export class CataloguesModule {}
