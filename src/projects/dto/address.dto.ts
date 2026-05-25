import { Decimal } from "@prisma/client/runtime/binary";
import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class AddressDto {

    @IsDecimal()
    @IsNotEmpty()
    lat!: Decimal;

    @IsDecimal()
    @IsNotEmpty()
    lng!: Decimal;

    @IsString()
    @IsNotEmpty()
    address!: string;
    
}