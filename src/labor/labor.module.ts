import { Module } from '@nestjs/common';
import { LaborController } from './labor.controller';
import { LaborService } from './labor.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LaborController],
  providers: [LaborService, PrismaService]
})
export class LaborModule {}
