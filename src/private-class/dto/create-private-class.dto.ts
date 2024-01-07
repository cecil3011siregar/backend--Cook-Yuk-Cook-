import { IsNotEmpty } from "class-validator";

export class CreatePrivateClassDto{
    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    theme: string;

    @IsNotEmpty()
    kitchen: string;

    @IsNotEmpty()
    trainee: string;
}