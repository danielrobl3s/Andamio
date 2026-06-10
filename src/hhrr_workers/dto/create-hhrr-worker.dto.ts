import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateHhrrWorkerDto {
    
    @IsString()
    @IsNotEmpty()
    worker_name!: string;

    @IsString()
    @IsNotEmpty()
    worker_lastname!: string;

    @IsString()
    @IsNotEmpty()
    phone!: string;

    @IsBoolean()
    @IsNotEmpty()
    has_insurance!: boolean;

    @IsString()
    @IsOptional()
    social_security_number?: string;

    @IsString()
    @IsOptional()
    job?: string;

    @IsDate()
    @IsNotEmpty()
    @Type(()=>Date)
    working_since!: Date;

    @IsString()
    @IsOptional()
    created_by?: string;

}