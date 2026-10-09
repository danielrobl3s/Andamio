
export class CreateVendorEntity {
    id!: string;
    name!: string;
    phone_number?: string;
    address?: string;
    created_at!: Date;
    updated_at!: Date
    created_by!: string;



    constructor(partial: Partial<CreateVendorEntity>){
        Object.assign(this, partial)
    }
}