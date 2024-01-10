import { IsNotEmpty } from "class-validator";
import { statusPay } from "../entities/users-payment.entity";
import { PartialType } from "@nestjs/mapped-types";
import { BookingKelasDto } from "./booking-kelas.dto";


export class BayarDto extends PartialType(BookingKelasDto){
    @IsNotEmpty()
    status: statusPay.APPROVE;
    
}