import { ExpenseKind } from "../interfaces/enums.interface";

export class ExpensesEntity {
    id!: string;
    kind!: ExpenseKind;
    worker_id?: string | null;
    worker_name?: string | null;
    worker_lastname?: string | null;
    phone_number?: string | null;
    payroll?: boolean | null;
    amount!: number;
    date!: Date;
    project_id?: string;
    property_id?: string;
    concept!: string;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;

    constructor(partial: Partial<ExpensesEntity>){
        Object.assign(this, partial);
    }
}