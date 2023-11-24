import { IsNotEmpty } from "class-validator";

export class UpdateKitchenDto{
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