import { ContractStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateClientLogDto {
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    lastname!: string;

    @IsString()
    @IsNotEmpty()
    phone!: string;

    @IsString()
    @IsNotEmpty()
    contract_id!: string;

    @IsString()
    @IsNotEmpty()
    contract_name!: string;

    @IsString()
    @IsNotEmpty()
    payment_type!: string;

    @IsNumber()
    @IsNotEmpty()
    amount!: number;

    @IsEnum(ContractStatus)
    @IsNotEmpty()
    contract_status!: ContractStatus;

    @IsString()
    @IsNotEmpty()
    created_by!: string;
}