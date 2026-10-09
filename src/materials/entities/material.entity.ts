import { MaterialStatus } from "../interfaces/enums.interface";


export class CreateMaterialEntity {
    id!: string;
    catalogue_material_id?: string;
    concept!: string;
    project_id?: string;
    vendor_name?: string;
    material_name?: string;
    unitary_price?: number;
    brand?: string;
    quantity!: number;
    total_price!: number;
    status!: MaterialStatus;
    created_at!: Date;
    updated_at!: Date
    created_by!: string;



    constructor(partial: Partial<CreateMaterialEntity>){
        Object.assign(this, partial)
    }
}