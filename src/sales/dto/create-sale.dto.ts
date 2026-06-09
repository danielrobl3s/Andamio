import { Type } from "class-transformer";
import { IsBoolean, IsDataURI, IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSaleDto {

    @IsUUID()
    @IsString()
    client_id!: string;

    @IsString()
    @IsNotEmpty()
    client_name!: string;

    @IsString()
    @IsNotEmpty()
    client_lastname!: string;

    @IsUUID()
    @IsNotEmpty()
    project_id!: string;

    @IsUUID()
    @IsNotEmpty()
    property_id!: string;

    @IsNotEmpty()
    @IsString()
    concept!: string;

    @IsNotEmpty()
    @IsNumber()
    amount!: number;

    @IsDate()
    @IsNotEmpty()
    @Type(()=>Date)
    date!: Date;

    @IsBoolean()
    @IsNotEmpty()
    is_credit!: boolean;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}