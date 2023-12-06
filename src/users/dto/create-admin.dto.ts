import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAdminDto{
    @IsNotEmpty()
    level_id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string
}