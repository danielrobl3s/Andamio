
export class SalesEntity {
    id!: string;
    client_id!: string;
    client_name!: string;
    client_lastname!: string;
    project_id!: string;
    property_id!: string;
    concept!: string;
    amount!: number;
    date!: Date;
    is_credit!: boolean;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;

    constructor( partial: Partial<SalesEntity>){
        Object.assign(this, partial)
    }
}