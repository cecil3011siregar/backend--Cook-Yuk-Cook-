import { IsNotEmpty } from "class-validator";

export class CreateNotifikasiDto{
    @IsNotEmpty()
    receiver: string;

    @IsNotEmpty()
    sender: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    message: string;

}