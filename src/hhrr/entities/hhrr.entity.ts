export class HhhrEntity {
    id!: string;
    worker_id!: string;
    worker_name!: string;
    worker_lastname!: string;
    phone_number!: string;
    payroll!: boolean;
    amount!: number;
    date!: Date;
    project_id?: string;
    property_id?: string;
    concept!: string;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;

    constructor(partial: Partial<HhhrEntity>){
        Object.assign(this, partial);
    }
}