import { type } from "#/users-payment/entities/users-payment.entity";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRegClassDto{
    @IsOptional()
    theme_id: string;

    @IsNotEmpty()
    kitchen_id: string;

    @IsNotEmpty()
    courseName: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    numberOfBenches: number;

    @IsNotEmpty()
    description: string;
    
    type: type;
}
