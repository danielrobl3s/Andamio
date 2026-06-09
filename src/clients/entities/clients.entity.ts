import { Gender } from "../interfaces/clients_types";

export class ClientsEntity {
    id!: string;
    name!: string;
    lastname!: string;
    gender!: Gender;
    phone_number!: string;
    email!: string;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;

    constructor(partial: Partial<ClientsEntity>){
        Object.assign(this, partial)
    }

}