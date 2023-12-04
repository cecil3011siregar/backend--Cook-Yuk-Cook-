import { IsNotEmpty } from "class-validator";
import { statusUser } from "../entities/user.entity";

export class ApproveRejectDto{
    @IsNotEmpty()
    status: statusUser
}