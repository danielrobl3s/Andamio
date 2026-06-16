import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export const modelFilters = {
    project: {} as Prisma.ProjectWhereInput,
    projectsProperties: {} as Prisma.ProjectsPropertiesWhereInput,
    sales: {} as Prisma.SalesWhereInput,
    hhrr: {} as Prisma.ExpensesWhereInput,
    hhrrWorker: {} as Prisma.LaborWhereInput,
    client: {} as Prisma.ClientWhereInput
} as const;


export type ModelName = keyof typeof modelFilters;

export type WhereInput<T extends ModelName> = typeof modelFilters[T];

export type PrismaDelegate = {
    findMany: (args?: unknown) => Promise<unknown[]>
}
