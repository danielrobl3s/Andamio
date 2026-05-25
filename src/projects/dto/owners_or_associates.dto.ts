import { IsNotEmpty, IsString } from "class-validator";

export class OwnersOrAssociatesDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    job!: string;
}