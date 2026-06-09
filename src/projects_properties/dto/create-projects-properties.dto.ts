import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";


export class CreateProjectsProperties {
    @IsUUID()
    @IsNotEmpty()
    project_id!: string;

    @IsString()
    @IsNotEmpty()
    property_name!: string;

    @IsNumber()
    @IsNotEmpty()
    number_of_lots!: number;

    @IsNumber()
    @IsNotEmpty()
    estimated_budget!: number;

    @IsDate()
    @IsNotEmpty()
    @Type(()=>Date)
    start_date!: Date;

    @IsDate()
    @IsOptional()
    @Type(()=>Date)
    end_date?: Date

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}