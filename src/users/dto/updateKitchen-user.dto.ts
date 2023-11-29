import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-user.dto';
import { statusUser } from '../entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class UpdateKitchenDto extends PartialType(CreateUsersDto) {
    @IsNotEmpty()
    status: statusUser;

}