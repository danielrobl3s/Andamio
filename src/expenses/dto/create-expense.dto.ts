import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateExpenseDto {

    @IsUUID()
    @IsOptional()
    worker_id?: string;

    @IsString()
    @IsOptional()
    worker_name?: string;

    @IsString()
    @IsOptional()
    worker_lastname?: string;

    @IsString()
    @IsOptional()
    phone_number?: string;

    @IsBoolean()
    @IsOptional()
    payroll?: boolean;

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
    @IsOptional()
    created_by?: string;

}