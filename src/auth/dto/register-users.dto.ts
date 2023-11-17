import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { gender } from "#/users/entities/user.entity";

export class RegisterUsersDto{
    @IsNotEmpty()
    level_id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

  
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    dateOfBirth: Date;

    @IsEnum(gender)
    gender: gender;

    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: string;

    @IsOptional()
    photo: string;

    @IsNotEmpty()
    address: string;

}