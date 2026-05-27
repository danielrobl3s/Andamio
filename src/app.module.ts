import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsPropertiesModule } from './projects_properties/projects_properties.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { PrismaService } from './prisma/prisma.service';
import { HhrrWorkersModule } from './hhrr_workers/hhrr_workers.module';

@Module({
  imports: [ProjectsModule, PrismaModule, ProjectsPropertiesModule, ClientsModule, SalesModule, HhrrWorkersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
