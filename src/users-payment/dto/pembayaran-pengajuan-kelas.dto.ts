import { IsNotEmpty } from "class-validator";
import { type } from "../entities/users-payment.entity";

export class PengajuanKelasDto{
    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    users: string;

    @IsNotEmpty()
    regular: string;

    @IsNotEmpty()
    bank: string;
    
    @IsNotEmpty()
    typePay: type;
}