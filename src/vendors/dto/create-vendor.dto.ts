import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVendorDto {
    
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    phone_number?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}