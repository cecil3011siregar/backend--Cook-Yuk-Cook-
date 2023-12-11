import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { statusRegular } from "../entities/regular-class.entity";

export class ApproveRejectRegularDto{
    @IsString()
    alasan: string;
    @IsNotEmpty()
    status: statusRegular
}