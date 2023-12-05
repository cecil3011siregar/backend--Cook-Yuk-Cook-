import { IsNotEmpty } from "class-validator";

export class CreateCertificateDto {
    @IsNotEmpty()
    date: Date
}