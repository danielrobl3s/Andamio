import { Module } from '@nestjs/common';
import { HhrrWorkersController } from './hhrr_workers.controller';
import { HhrrWorkersService } from './hhrr_workers.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HhrrWorkersController],
  providers: [HhrrWorkersService, PrismaService]
})
export class HhrrWorkersModule {}
