import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectsProperties } from "./create-projects-properties.dto";


export class UpdateProjectsProperties extends PartialType(CreateProjectsProperties){}