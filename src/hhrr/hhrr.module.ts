import { Module } from '@nestjs/common';
import { HhrrController } from './hhrr.controller';
import { HhrrService } from './hhrr.service';

@Module({
  controllers: [HhrrController],
  providers: [HhrrService]
})
export class HhrrModule {}
