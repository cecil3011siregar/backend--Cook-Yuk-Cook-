import { IsNotEmpty } from "class-validator";

export class createKitchenDto{
    @IsNotEmpty()
    users_id: string;

    @IsNotEmpty()
    legality: string;

    @IsNotEmpty()
    numberOfChefs: number;

    @IsNotEmpty()
    chefOnWork: number;

    @IsNotEmpty()
    chefOnAvailable: number;
    
    @IsNotEmpty()
    logos: string;

    @IsNotEmpty()
    description: string;
}