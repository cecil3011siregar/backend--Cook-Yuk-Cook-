import { IsNotEmpty } from "class-validator";

export class CreateMaterialDto{
    @IsNotEmpty()
    type_class: string

    @IsNotEmpty()
    idclass: string

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    link: string;

}