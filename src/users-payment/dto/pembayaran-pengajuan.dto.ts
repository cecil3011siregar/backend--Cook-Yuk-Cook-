import { IsNotEmpty } from "class-validator";
import { type } from "../entities/users-payment.entity";

export class PembayaranPengajuanDto{
    @IsNotEmpty()
    bank: string;

    @IsNotEmpty()
    users: string;

    @IsNotEmpty()
    regular: string;
    
    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    price:number;

    // @IsNotEmpty()
    // total_payment: number;

    @IsNotEmpty()
    typePay: type

    @IsNotEmpty()
    photoProof: string;

}