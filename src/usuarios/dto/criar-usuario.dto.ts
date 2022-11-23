import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, ValidateNested } from "class-validator";
import { EnderecoDTO } from "./endereco.dto";

export class CriaUsuarioDTO {
    readonly nome: string;
    @IsEmail(undefined, { message: "O e-mail informado não é válido" })
    readonly email: string;
    readonly senha: string;
    @ValidateNested() // Validar objetos dos arrays
    @IsArray() // Verifica se é um array
    @Type(() => EnderecoDTO) // Tipo de validação a ser aplicada.
    @ArrayNotEmpty() // caso queira validar que o array está vazio.
    readonly endereco: EnderecoDTO[];
}