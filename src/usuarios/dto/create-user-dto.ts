import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "src/core/constraints/match.decorator";
import { UserRole } from "../enum/user.role";

export class CreateUserDTO {

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
    @Match('password') // Validar se password == confirm_password
    readonly confirm_password: string;
    
    readonly role: UserRole;

    // readonly senha: string;
    // @ValidateNested() // Validar objetos dos arrays
    // @IsArray() // Verifica se é um array
    // @Type(() => EnderecoDTO) // Tipo de validação a ser aplicada.
    // @ArrayNotEmpty() // caso queira validar que o array está vazio.
    // readonly endereco: EnderecoDTO[];
}