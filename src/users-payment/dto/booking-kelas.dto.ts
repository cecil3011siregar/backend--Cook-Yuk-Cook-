import { IsNotEmpty } from "class-validator";
import { type } from "../entities/users-payment.entity";

export class BookingKelasDto{

    // @IsNotEmpty()
    // bank: string;

    @IsNotEmpty()
    users: string;

    @IsNotEmpty()
    idclass: string;

    // @IsNotEmpty()
    // date: Date;

    price: number;

    // @IsNotEmpty()
    // totalPayment: number;
    
    @IsNotEmpty()
    typePay: type;
}