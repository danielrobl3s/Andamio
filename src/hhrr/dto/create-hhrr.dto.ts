import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateHhrrDto {

    @IsUUID()
    @IsNotEmpty()
    worker_id!: string;

    @IsString()
    @IsNotEmpty()
    worker_name!: string;

    @IsString()
    @IsNotEmpty()
    worker_lastname!: string;

    @IsString()
    @IsNotEmpty()
    phone_number!: string;

    @IsBoolean()
    @IsNotEmpty()
    payroll!: boolean;

    @IsNumber()
    @IsNotEmpty()
    amount!: number;

    @IsDate()
    @IsNotEmpty()
    @Type(()=>Date)
    date!: Date

    @IsUUID()
    @IsOptional()
    project_id?: string;

    @IsUUID()
    @IsOptional()
    property_id?: string;

    @IsString()
    @IsNotEmpty()
    concept!: string;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}