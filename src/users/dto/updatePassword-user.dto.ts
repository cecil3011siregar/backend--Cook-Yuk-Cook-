import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-user.dto';
import { statusUser } from '../entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto extends PartialType(CreateUsersDto) {
    @IsNotEmpty()
    password: string;

}