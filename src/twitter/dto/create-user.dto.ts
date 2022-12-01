import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  
    @IsString()
    @IsNotEmpty()
    nome:string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    usuario: string;

    @IsBoolean()
    @IsNotEmpty()
    ativo: boolean;
}