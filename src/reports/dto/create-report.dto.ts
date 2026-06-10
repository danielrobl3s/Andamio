import { IsBoolean, IsDate, IsIn, IsJSON, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import type { Query } from "../interfaces/query.interface";
import { Type } from "class-transformer";
import { QueryDto } from "./query.dto";
import type { ModelName } from '../interfaces/filters.types';
import { modelFilters} from "../interfaces/filters.types";

export class CreateReportDto<T extends ModelName>{

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsIn(Object.keys(modelFilters))
    model!: ModelName;

    @ValidateNested({each: true})
    @Type(()=>QueryDto)
    query!: QueryDto<T>;

    @IsDate()
    @IsNotEmpty()
    @Type(()=>Date)
    date!: Date;

    @IsBoolean()
    @IsNotEmpty()
    is_bill!: boolean;

    @IsString()
    @IsNotEmpty()
    issued_by!: string;

    @IsUUID()
    @IsNotEmpty()
    project_id!: string;

    @IsUUID()
    @IsNotEmpty()
    property_id!: string;

    @IsString()
    @IsOptional()
    created_by?: string;

}