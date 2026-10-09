import { Module } from '@nestjs/common';
import { CatalogueMaterialsController } from './catalogue_materials.controller';
import { CatalogueMaterialsService } from './catalogue_materials.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CatalogueMaterialsController],
  providers: [CatalogueMaterialsService, PrismaService]
})
export class CatalogueMaterialsModule {}
