import { InputJsonValue } from '@prisma/client/runtime/binary.js';
import { OwnersOrAssociatesDto } from '../dto/owners_or_associates.dto';
import { AddressDto } from '../dto/address.dto';

export class ProjectEntity {
    id!: string;
    project_name!: string;
    owners_or_associates!: OwnersOrAssociatesDto;
    lots!: number;
    start_date!: Date;
    end_date?: Date;
    address!: AddressDto;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;

    constructor(partial: Partial<ProjectEntity>){
        Object.assign(this, partial);
    }
}