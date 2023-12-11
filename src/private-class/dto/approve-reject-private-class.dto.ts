import { IsNotEmpty, IsString } from "class-validator";
import { statusPrivate } from "../entities/private-class.entity";

export class ApproveRejectPrivateDto{
    @IsString()
    alasan_tolak: string

    @IsNotEmpty()
    status: statusPrivate;
    
}