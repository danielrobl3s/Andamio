import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsPropertiesModule } from './projects_properties/projects_properties.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { PrismaService } from './prisma/prisma.service';
import { LaborModule } from './labor/labor.module'
import { ExpensesModule } from './expenses/expenses.module';
import { ReportsModule } from './reports/reports.module';
import { auth } from './lib/auth';
import { AuthGuard, AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProjectsModule, 
    PrismaModule, 
    ProjectsPropertiesModule, 
    ClientsModule, 
    SalesModule, 
    LaborModule, 
    ExpensesModule, 
    ReportsModule,
    BetterAuthModule.forRoot({auth}),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService,
    { provide: APP_GUARD, useValue: AuthGuard}
  ],
})
export class AppModule {}
