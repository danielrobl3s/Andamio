import { PartialType } from "@nestjs/mapped-types";
import { InputJsonValue } from "@prisma/client/runtime/binary";
import { ModelName } from "../interfaces/filters.types";

export class ReportsEntity {
    id!: string;
    name!: string;
    model!: ModelName;
    query!: InputJsonValue;
    date!: Date;
    is_bill!: boolean;
    issued_by!: string;
    project_id!: string;
    property_id!: string;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;


    constructor(partial: Partial<ReportsEntity>){
        Object.assign(this, partial);
    }
}