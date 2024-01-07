import { IsNotEmpty, IsInt } from "class-validator";

export class CreateTraining_themeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    chef_name: string;

    @IsNotEmpty()
    @IsInt()
    price: number;

    @IsNotEmpty()
    kitchen:string;
}
