import { IsNotEmpty } from "class-validator";

export class UpdateCertificateDto {
    @IsNotEmpty()
    date: Date;
}