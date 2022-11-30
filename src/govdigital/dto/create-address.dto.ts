import { IsNumber, IsString } from "class-validator";

export class CreateAddressDTO {
    @IsString()
    readonly street: string;

    @IsNumber()
    readonly number: number;

    @IsString()
    readonly district: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly state: string;

    @IsString()
    readonly country: string;

    @IsString()
    readonly zip: string;

}