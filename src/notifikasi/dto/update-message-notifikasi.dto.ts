import { IsNotEmpty } from "class-validator";

export class UpdateMessageNotifikasiDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    message: string;
}