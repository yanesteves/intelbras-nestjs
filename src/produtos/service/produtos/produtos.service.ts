import { Injectable } from '@nestjs/common';
import { Produto } from 'src/produtos/model/produto.model';

@Injectable()
export class ProdutosService {
    private readonly produtos: Produto[] = [
        new Produto('LIV01', 'Livro TDD e BDD na prática', 29.9),
        new Produto('LIV02', 'Livro Iniciando com Flutter', 39.9),
        new Produto('LIV03', 'Inteligência artificial como serviço', 29.9),
      ];
    
      obterTodos(): Produto[] {
        return this.produtos;
      }
    
      obterUm(id: number): Produto {
        return this.produtos[0];
      }
    
      criar(produto: Produto) {
        this.produtos.push(produto);
      }
    
      alterar(produto: Produto): Produto {
        return produto;
      }
    
      apagar(id: number) {
        this.produtos.pop();
      }
}
