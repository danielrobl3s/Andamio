import { PartialType } from "@nestjs/mapped-types";
import { CreateCatalogueMaterialDto } from "./create-catalogue_material.dto";

export class UpdateCatalogueMaterialDto extends PartialType(CreateCatalogueMaterialDto){}
