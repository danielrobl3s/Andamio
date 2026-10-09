
export class CreateCatalogueEntity {
    id!: string;
    vendor_id!: string;
    name!: string;
    material_type?: string;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;



    constructor(partial: Partial<CreateCatalogueEntity>){
        Object.assign(this, partial)
    }
}
