import { PartialType } from "@nestjs/mapped-types";
import { CreateHhrrWorkerDto } from "./create-hhrr-worker.dto";

export class UpdateHhrrWorkerDto extends PartialType(CreateHhrrWorkerDto){}