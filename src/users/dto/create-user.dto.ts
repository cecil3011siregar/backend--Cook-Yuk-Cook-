import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional } from "class-validator";
import { gender } from "../entities/user.entity";

export class CreateUsersDto{
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