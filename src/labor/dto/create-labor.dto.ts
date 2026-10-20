import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLaborDto {
    
    @IsString()
    @IsNotEmpty()
    worker_name!: string;

    @IsString()
    @IsOptional()
    worker_lastname?: string | null;

    @IsString()
    @IsOptional()
    phone?: string | null;

    @IsBoolean()
    @IsOptional()
    has_insurance?: boolean;

    @IsString()
    @IsOptional()
    social_security_number?: string;

    @IsString()
    @IsOptional()
    job?: string;

    @IsDate()
    @IsOptional()
    @Type(()=>Date)
    working_since?: Date;

    @IsString()
    @IsOptional()
    created_by?: string;

}