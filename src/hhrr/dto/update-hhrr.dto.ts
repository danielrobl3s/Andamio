import { PartialType } from "@nestjs/mapped-types";
import { CreateHhrrDto } from "./create-hhrr.dto";

export class UpdateHhrrDto extends PartialType(CreateHhrrDto){}