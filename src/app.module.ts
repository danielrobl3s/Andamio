import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsPropertiesModule } from './projects_properties/projects_properties.module';

@Module({
  imports: [ProjectsModule, PrismaModule, ProjectsPropertiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
