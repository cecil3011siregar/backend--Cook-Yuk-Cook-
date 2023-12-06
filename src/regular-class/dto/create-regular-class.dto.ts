import { IsNotEmpty } from "class-validator";

export class CreateRegClassDto{
    @IsNotEmpty()
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
}
