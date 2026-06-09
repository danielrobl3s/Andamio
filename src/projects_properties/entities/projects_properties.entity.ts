
export class ProjectsProperties {
    
    id!: string;
    project_id!: string;
    property_name!: string;
    number_of_lots!: number;
    estimated_budget!: number;
    start_date!: Date;
    end_date!: Date;
    created_at!: Date;
    updated_at!: Date;
    created_by!: string;


    constructor(partial: Partial<ProjectsProperties>){
        Object.assign(this, partial);
    }
}