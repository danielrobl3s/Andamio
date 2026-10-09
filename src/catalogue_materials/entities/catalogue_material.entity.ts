
export class CreateCatalogueMaterialEntity {
    id!: string;
    catalogue_id!: string;
    material_name!: string;
    unitary_price!: number;
    measurement_unit!: string;
    brand?: string;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;



    constructor(partial: Partial<CreateCatalogueMaterialEntity>){
        Object.assign(this, partial)
    }
}
