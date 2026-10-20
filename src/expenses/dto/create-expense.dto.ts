import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ExpenseKind } from "../interfaces/enums.interface";

export class CreateExpenseDto {

    @IsEnum(ExpenseKind)
    @IsOptional()
    kind?: ExpenseKind;

    @IsUUID()
    @IsOptional()
    worker_id?: string | null;

    @IsString()
    @IsOptional()
    worker_name?: string | null;

    @IsString()
    @IsOptional()
    worker_lastname?: string | null;

    @IsString()
    @IsOptional()
    phone_number?: string | null;

    @IsBoolean()
    @IsOptional()
    payroll?: boolean | null;

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