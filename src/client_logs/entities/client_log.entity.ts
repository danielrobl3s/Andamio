import { ContractStatus } from "@prisma/client";

export class ClientLogEntity {
    id!: string;
    name!: string;
    lastname!: string;
    phone!: string;
    contract_id!: string;
    contract_name!: string;
    payment_type!: string;
    amount!: number;
    contract_status!: ContractStatus;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;

    constructor(partial: Partial<ClientLogEntity>){
        Object.assign(this, partial);
    }
}