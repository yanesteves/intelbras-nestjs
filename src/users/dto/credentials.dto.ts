import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CredentialsDTO {
    @IsString()
    @IsEmail()
    @MaxLength(30)
    readonly email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly password: string;
}