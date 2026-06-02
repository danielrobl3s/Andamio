export class Users {
    
    id!: string;
    email!: string;
    password!: string;
    name!: string;
    created_at!: Date;
    updated_at!: Date;


    constructor(partial: Partial<Users>){
        Object.assign(this, partial);
    }
}