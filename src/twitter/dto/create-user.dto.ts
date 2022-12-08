import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  
    @IsString()
    @MinLength(3)    
    @MaxLength(50)
    readonly name: string;

    @IsString()
    @MaxLength(30)
    @IsEmail(undefined, { message: "O e-mail informado não é válido" })
    readonly email: string;
        
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly password: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    // @Match('password') // Validar se password == confirm_password
    readonly confirm_password: string;    
}