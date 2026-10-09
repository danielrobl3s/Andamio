import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MaterialStatus } from "../interfaces/enums.interface";

export class CreateMaterialDto {
    
    @IsString()
    @IsOptional()
    catalogue_material_id?: string;

    @IsString()
    @IsNotEmpty()
    concept!: string;

    @IsString()
    @IsOptional()
    project_id?: string;

    @IsString()
    @IsOptional()
    vendor_name?: string;

    @IsString()
    @IsOptional()
    material_name?: string;

    @IsNumber()
    @IsOptional()
    unitary_price?: number;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsNumber()
    @IsNotEmpty()
    quantity!: number;

    @IsNumber()
    @IsNotEmpty()
    total_price!: number;

    @IsEnum(MaterialStatus)
    status!: MaterialStatus;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}