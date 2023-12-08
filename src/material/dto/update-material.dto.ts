import { IsNotEmpty } from "class-validator";

export class UpdateMaterialDto{
    @IsNotEmpty()
    idclass : string
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    link: string;
}