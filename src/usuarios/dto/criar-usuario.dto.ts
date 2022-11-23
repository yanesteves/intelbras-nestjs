// import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
// import { EnderecoDTO } from "./endereco.dto";

export class CriaUsuarioDTO {
    
    @IsString()
    @IsNotEmpty()
    readonly name: string;    

    @IsEmail(undefined, { message: "O e-mail informado não é válido" })
    readonly email: string;
    
    @IsBoolean()
    readonly active: boolean;

    // readonly senha: string;
    // @ValidateNested() // Validar objetos dos arrays
    // @IsArray() // Verifica se é um array
    // @Type(() => EnderecoDTO) // Tipo de validação a ser aplicada.
    // @ArrayNotEmpty() // caso queira validar que o array está vazio.
    // readonly endereco: EnderecoDTO[];
}