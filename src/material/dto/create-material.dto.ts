import { IsNotEmpty } from "class-validator";

export class CreateMaterialDto{
    @IsNotEmpty()
    type_class: string

    idclass: string
    // idReg: string;
    // idPriv: string;
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    link: string;

}