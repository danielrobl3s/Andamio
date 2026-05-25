import { address } from "./address.interface";
import { OwnersOrAssociates } from "./owners_or_associates.interface";


export interface ProjectMapped {
    id: string;
    project_name: string;
    owners_or_associates: OwnersOrAssociates[];
    lots: number;
    start_date: Date;
    end_date?: Date | null;
    address: address;
    created_at?: Date;
    updated_at?: Date;
    
}