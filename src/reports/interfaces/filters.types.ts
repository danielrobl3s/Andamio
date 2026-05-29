import { Prisma } from '@prisma/client';

export const modelFilters = {
    Projects: {} as Prisma.ProjectWhereInput,
    Projects_properties: {} as Prisma.ProjectsPropertiesWhereInput,
    Sales: {} as Prisma.SalesWhereInput,
    hhrr: {} as Prisma.HhrrWhereInput,
    hhrr_workers: {} as Prisma.HhrrWorkerWhereInput,
    clients: {} as Prisma.ClientWhereInput
} as const;


export type ModelName = keyof typeof modelFilters;

export type WhereInput<T extends ModelName> = typeof modelFilters[T];

