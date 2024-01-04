import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-user.dto';
import { gender } from '../entities/user.entity';
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {

    @IsNotEmpty()
    nama: string;

    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsOptional()
    numberOfChef: number;

    @IsOptional()
    address: string;

    @IsOptional()
    @IsEnum(gender)
    gender: gender;

    @IsOptional()
    dateOfBirth: Date;

    @IsOptional()
    photo: string;

}
