import { IsNotEmpty } from "class-validator";
import { type } from "../entities/users-payment.entity";

export class BookingRegularDto{
    @IsNotEmpty()
    bank: string;

    @IsNotEmpty()
    users: string;

    @IsNotEmpty()
    regular: string;

    @IsNotEmpty()
    date: Date;

    // @IsNotEmpty()
    // price: number;
    
    @IsNotEmpty()
    typePay: type;
}