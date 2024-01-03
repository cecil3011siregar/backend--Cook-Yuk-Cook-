import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateKitchenDto{
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    alamat: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    numberOfChefs: number;

    @IsOptional()
    legality: string;

    @IsOptional()
    chefOnWork: number;

    @IsOptional()
    chefOnAvailable: number;
    
    @IsOptional()
    logos: string;

    @IsOptional()
    description: string;
}