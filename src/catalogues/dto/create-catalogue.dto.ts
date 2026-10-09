import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCatalogueDto {

    @IsString()
    @IsNotEmpty()
    vendor_id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    material_type?: string;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}
