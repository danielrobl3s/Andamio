import { PartialType } from "@nestjs/mapped-types";
import { CreateClientLogDto } from "./create-client_log.dto";

export class UpdateClientLogDto extends PartialType(CreateClientLogDto){}