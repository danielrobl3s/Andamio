import { ContractStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateContractDto {
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    type!: string;

    @IsNumber()
    @IsNotEmpty()
    amount!: number;

    @IsEnum(ContractStatus)
    @IsNotEmpty()
    status!: ContractStatus;

    @IsNumber()
    @IsNotEmpty()
    remaining_amount!: number;

    @IsString()
    @IsNotEmpty()
    client_id!: string;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}