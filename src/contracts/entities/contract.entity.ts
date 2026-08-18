import { ContractStatus } from "@prisma/client";

export class ContractEntity {
    id!: string;
    name!: string;
    type!: string;
    amount!: number;
    status!: ContractStatus;;
    remaining_amount!: number;
    created_at!: Date;
    updated_at!: Date;
    client_id!: string;
    created_by!: string;

    constructor(partial: Partial<ContractEntity>){
        Object.assign(this, partial);
    }
}