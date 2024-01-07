import { IsInt, IsNumber, Min } from "class-validator";

export class JumlahBenchesDto{
    @IsInt()
    @Min(0)
    numberOfBenches: number;
}