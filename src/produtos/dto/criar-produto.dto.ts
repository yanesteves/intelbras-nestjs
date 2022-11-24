import { IsNotEmpty, IsString } from "class-validator";
import { CategoriaProduto } from "../utils/CategoriaProduto.enum";

export class CriarProdutoDTO {
    
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly code: string;
    
    readonly category: CategoriaProduto;

    readonly price: number;
    
    readonly stock: number;
}