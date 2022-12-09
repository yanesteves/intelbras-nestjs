import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    readonly username: string;

    @IsString()
    @MaxLength(30)
    @IsEmail(undefined, { message: "O e-mail informado não é válido" })
    readonly email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly password: string;
}
