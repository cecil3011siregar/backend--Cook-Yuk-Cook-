import { IsNotEmpty } from "class-validator";

export class TransaksiAdminToKitchenDto{
    @IsNotEmpty()
    kitchen:string;

    @IsNotEmpty()
    admin:string;

    // @IsNotEmpty()
    // totalPayment: number;
    
    @IsNotEmpty()
    adminFee: number;
}