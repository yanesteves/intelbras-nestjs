import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AtualizaUsuarioDTO {    
    @IsString()
    @IsNotEmpty()
    readonly name: string;    

    @IsEmail(undefined, { message: "O e-mail informado não é válido" })
    readonly email: string;
    
    @IsBoolean()
    readonly active: boolean;
}