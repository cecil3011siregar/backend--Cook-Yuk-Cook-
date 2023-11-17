import { IsNotEmpty} from "class-validator";

export class CreateLevelUsersDto{
    @IsNotEmpty()
    name: string;
}