import { IsNotEmpty } from "class-validator";
import { statusNotif } from "../entities/notifikasi.entity";

export class UpdateStatusNotifikasiDto{
    @IsNotEmpty()
    status: statusNotif
}