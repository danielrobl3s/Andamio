import { IsObject, IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";
import { Prisma, Project } from "@prisma/client";
import { ModelName } from "../interfaces/filters.types";
import type { WhereInput } from '../interfaces/filters.types';

export class QueryDto <T extends ModelName>{
    @IsOptional()
    where?: WhereInput<T>;

    @IsOptional()
    @IsObject()
    orderBy?: Record<string, 'asc' | 'desc'>

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    take?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    skip?: number;

    @IsOptional()
    @IsObject()
    include?: Record<string, boolean>;

    @IsOptional()
    @IsObject()
    select?: Record<string, boolean>;
}