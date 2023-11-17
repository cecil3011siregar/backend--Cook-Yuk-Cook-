import { PartialType } from "@nestjs/mapped-types";
import { CreateLevelUsersDto } from "./create-level-users.dto";

export class UpdateLevelUsersDto extends PartialType(CreateLevelUsersDto){}