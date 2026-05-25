import { IsArray, IsDate, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { OwnersOrAssociatesDto } from './owners_or_associates.dto';
import { AddressDto } from './address.dto';


export class CreateProjectDto {
    
    @IsString()
    @IsNotEmpty()
    project_name!: string;

    @IsArray()
    @ValidateNested({each: true}) @Type(()=>OwnersOrAssociatesDto) owners_or_associates!: OwnersOrAssociatesDto[];

    @IsNumber()
    @IsNotEmpty()
    lots!: number;

    @IsDate()
    @IsNotEmpty()
    @Type(()=> Date)
    start_date!: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    end_date?: Date;

    @ValidateNested() @Type(()=>AddressDto) address!: AddressDto


}