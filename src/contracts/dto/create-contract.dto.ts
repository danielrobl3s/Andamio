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

    @IsEnum(ContractStatus)
    @IsNotEmpty()
    remaining_amount!: ContractStatus;

    @IsDate()
    @Type(() => Date)
    created_at!: Date;

    @IsDate()
    @Type(() => Date)
    updated_at!: Date;

    @IsString()
    @IsNotEmpty()
    client_id!: string;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}