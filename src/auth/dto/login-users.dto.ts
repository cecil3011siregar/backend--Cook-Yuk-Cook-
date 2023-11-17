import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUsersDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

  
    @IsNotEmpty()
    password: string
}