export class CreateHHRRWorkerEntity {
    id!: string;
    worker_name!: string;
    worker_lastname!: string;
    phone!: string;
    has_insurance!: boolean;
    social_security_number?: string;
    job?: string;
    working_since!: Date;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;


    constructor(partial: Partial<CreateHHRRWorkerEntity>){
        Object.assign(this, partial)
    }
}