import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import type { Gender } from "../interfaces/clients_types";

export class CreateClientDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    lastname!: string;

    @IsEnum(['Hombre', 'Mujer', 'Otro'])
    @IsNotEmpty()
    gender!: Gender;

    @IsString()
    @IsNotEmpty()
    phone_number!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    created_by!: string;

}