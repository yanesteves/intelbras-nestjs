import { IsNotEmpty, IsString } from "class-validator";

export class CreateVaccineDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;   

    @IsNotEmpty()
    @IsString()
    readonly laboratory: string;   
}