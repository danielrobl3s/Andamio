import { Prisma } from "@prisma/client";

export interface Query {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
    take?: number;
    skip?: number;
    include?: Prisma.ProjectInclude;
    select?: Prisma.ProjectSelect;
}

