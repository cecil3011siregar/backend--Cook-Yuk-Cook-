import { gender } from "#/users/entities/user.entity";
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDto{
    @IsNotEmpty()
    level_id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string

    @IsOptional()
    dateOfBirth: Date;

    @IsOptional()
    @IsEnum(gender)
    gender: gender;

    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: string;

    @IsOptional()
    photo: string;

    @IsNotEmpty()
    address: string;

    @IsOptional()
    legality: string;

    @IsOptional()
    numberOfChefs: number;

    @IsOptional()
    chefOnWork: number;

    @IsOptional()
    chefOnAvailable: number;
    
    @IsOptional()
    logos: string;

    @IsOptional()
    description: string;
}