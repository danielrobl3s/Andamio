import { Module } from '@nestjs/common';
import { ProjectsPropertiesController } from './projects_properties.controller';
import { ProjectsPropertiesService } from './projects_properties.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProjectsPropertiesController],
  providers: [ProjectsPropertiesService, PrismaService]
})
export class ProjectsPropertiesModule {}
