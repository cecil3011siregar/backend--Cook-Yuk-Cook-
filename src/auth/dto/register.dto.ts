import { gender } from "#/users/entities/user.entity";
import { IsEmail, IsEmpty, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional } from "class-validator";
import { IsNull } from "typeorm";

export class RegisterDto{
    @IsOptional()
    level: string;

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
    // @IsMobilePhone()
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