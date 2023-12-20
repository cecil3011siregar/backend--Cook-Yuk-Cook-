import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateBangkuDto{
    // @IsInt()
    numberOfBenches: number;
}