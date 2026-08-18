import { Module } from '@nestjs/common';
import { ClientLogsController } from './client_logs.controller';
import { ClientLogsService } from './client_logs.service';

@Module({
  controllers: [ClientLogsController],
  providers: [ClientLogsService]
})
export class ClientLogsModule {}
