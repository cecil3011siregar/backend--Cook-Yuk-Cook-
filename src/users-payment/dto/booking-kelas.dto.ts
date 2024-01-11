import { IsNotEmpty } from "class-validator";
import { statusPay, type } from "../entities/users-payment.entity";

export class BookingKelasDto{

    // @IsNotEmpty()
    // bank: string;


    @IsNotEmpty()
    users: string;

    @IsNotEmpty()
    idclass: string;

    
    typePay: type;
    
    // @IsNotEmpty()
    // date: Date;
    
    // @IsNotEmpty()
    // status: statusPay;

    // price: number;

    // @IsNotEmpty()
    // totalPayment: number;
    
}