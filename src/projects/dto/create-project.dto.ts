import { IsDate, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { OwnersOrAssociatesDto } from './owners_or_associates.dto';
import { AddressDto } from './address.dto';


export class CreateProjectDto {
    
    @IsString()
    @IsNotEmpty()
    project_name!: string;

    @ValidateNested({each: true}) @Type(()=>OwnersOrAssociatesDto) owners_or_associates!: OwnersOrAssociatesDto[];

    @IsNumber()
    @IsNotEmpty()
    lots!: number;

    @IsDate()
    @IsNotEmpty()
    start_date!: Date;

    @IsDate()
    @IsOptional()
    end_date?: Date;

    @ValidateNested() @Type(()=>AddressDto) address!: AddressDto


}