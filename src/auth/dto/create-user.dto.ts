import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;


}