import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCatalogueMaterialDto {

    @IsString()
    @IsNotEmpty()
    catalogue_id!: string;

    @IsString()
    @IsNotEmpty()
    material_name!: string;

    @IsNumber()
    @IsNotEmpty()
    unitary_price!: number;

    @IsString()
    @IsNotEmpty()
    measurement_unit!: string;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}
