import { ContractStatus } from "@prisma/client";

export class ClientLogEntity {
    id!: string;
    name?: string | null;
    lastname?: string | null;
    phone?: string | null;
    contract_id!: string;
    contract_name!: string;
    payment_type?: string | null;
    amount!: number;
    contract_status!: ContractStatus;
    date!: Date;
    notes?: string | null;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;

    constructor(partial: Partial<ClientLogEntity>){
        Object.assign(this, partial);
    }
}