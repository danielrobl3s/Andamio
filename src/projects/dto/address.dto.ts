import { Decimal } from "@prisma/client/runtime/binary";
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddressDto {

    @IsNumber()
    @IsNotEmpty()
    lat!: Decimal;

    @IsNumber()
    @IsNotEmpty()
    lng!: Decimal;

    @IsString()
    @IsNotEmpty()
    address!: string;
    
}