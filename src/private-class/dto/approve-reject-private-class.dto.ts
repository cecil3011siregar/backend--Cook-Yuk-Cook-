import { IsNotEmpty } from "class-validator";
import { statusPrivate } from "../entities/private-class.entity";

export class ApproveRejectPrivateDto{
    @IsNotEmpty()
    status: statusPrivate;
}