import { IsNotEmpty } from "class-validator";

export class UpdateRegClassDto{
    @IsNotEmpty()
    courseName: string;

    @IsNotEmpty()
    theme_id:string
}
