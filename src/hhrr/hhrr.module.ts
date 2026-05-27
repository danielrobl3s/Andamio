import { Module } from '@nestjs/common';
import { HhrrController } from './hhrr.controller';
import { HhrrService } from './hhrr.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [HhrrController],
  providers: [HhrrService, PrismaService]
})
export class HhrrModule {}
