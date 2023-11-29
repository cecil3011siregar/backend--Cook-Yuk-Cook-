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
    
    @IsEnum(gender)
    gender: gender;

    @IsNotEmpty()
    dateOfBirth: Date;

    @IsOptional()
    photo: string;

}
