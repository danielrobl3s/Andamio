import { ContractStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";


export class CreateClientLogDto {
    
    @IsString()
    @IsOptional()
    name?: string | null;

    @IsString()
    @IsOptional()
    lastname?: string | null;

    @IsString()
    @IsOptional()
    phone?: string | null;

    @IsString()
    @IsNotEmpty()
    contract_id!: string;

    @IsString()
    @IsNotEmpty()
    contract_name!: string;

    @IsString()
    @IsOptional()
    payment_type?: string | null;

    @IsNumber()
    @IsNotEmpty()
    amount!: number;

    @IsEnum(ContractStatus)
    @IsNotEmpty()
    contract_status!: ContractStatus;

    // Not nullable: omit it to default to now(), but an explicit null is a 400
    @ValidateIf((_, value) => value !== undefined)
    @IsDate()
    @Type(()=>Date)
    date?: Date;

    @IsString()
    @IsOptional()
    notes?: string | null;

    @IsString()
    @IsNotEmpty()
    created_by!: string;
}