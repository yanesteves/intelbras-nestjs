import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "src/core/constraints/match.decorator";

export class CreateUserDTO {

    @IsString()
    @MinLength(3)    
    @MaxLength(50)
    readonly name: string;

    @IsString()
    @IsEmail()
    @MaxLength(30)
    readonly email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly password: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Match('password') // Validar se password == confirm_password
    readonly confirm_password: string;
}