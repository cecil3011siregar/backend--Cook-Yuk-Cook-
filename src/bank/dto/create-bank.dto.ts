import { IsNotEmpty } from "class-validator";

export class CreateBankDto {

    @IsNotEmpty()
    id_users: string;

    @IsNotEmpty()
    account_number: string;

    @IsNotEmpty()
    bank_name: string;

    @IsNotEmpty()
    account_owner: string;

}