import { Module } from '@nestjs/common';
import { ClientLogsController } from './client_logs.controller';
import { ClientLogsService } from './client_logs.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ClientLogsController],
  providers: [ClientLogsService, PrismaService]
})
export class ClientLogsModule {}
