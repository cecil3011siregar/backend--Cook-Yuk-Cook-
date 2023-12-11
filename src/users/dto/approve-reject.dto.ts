import { IsNotEmpty, IsString } from "class-validator";
import { statusUser } from "../entities/user.entity";

export class ApproveRejectDto{
    @IsString()
    alasan: string
    @IsNotEmpty()
    status: statusUser
}