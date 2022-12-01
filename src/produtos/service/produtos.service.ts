import { Inject, Injectable } from '@nestjs/common';
import { CriarProdutoDTO } from '../dto/criar-produto.dto';
import { FindProductDTO } from '../dto/find-product.dto';
import { ProductEntity } from '../entities/produto.entity';
import { ILike, Repository } from 'typeorm';
import { CategoriaProduto } from '../utils/CategoriaProduto.enum';

@Injectable()
export class ProdutosService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productRepository: Repository<ProductEntity>
  ) { }

  passILike(obj) {
    const aux = { ...obj };
    Object.keys(obj).forEach((key, index) => {
      aux[key] = ILike(`%${obj[key]}%`)
    })
    console.log('-- aux --')
    console.log(aux)
    return aux;
  }

  async find(query?): Promise<ProductEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (query){          
          resolve(await this.productRepository.find({
            where: this.passILike(query)
          }))
        }

        resolve(await this.productRepository.find())
      } catch (error) {
        reject(error)
      }
    })
  }

  async findOne(param: FindProductDTO): Promise<ProductEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.productRepository.findOneBy(param));
      } catch (error) {
        reject(error)
      }
    })
  }

  async insert(product: CriarProdutoDTO): Promise<ProductEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.productRepository.insert({ ...product, category: parseInt(CategoriaProduto[product.category]) });
        const { id } = response.generatedMaps[0]
        let created = new ProductEntity();
        created = { ...product, id: id };
        resolve(created)
      } catch (error) {
        console.log('-- insert error --')
        console.log(error)
        reject({
          code: error.code,
          detail: error.detail
        })
      }
    })
  }

  async delete(id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        // verifico se alguma linha foi afetada após o delete.
        const { affected } = await this.productRepository.delete({ id: id })
        // se linha alguma foi afetada significa que não foi realizado o delete.
        if (affected === 0) {
          reject({
            code: 20000,
            detail: 'Este ID não está presente no banco de dados ou não foi possível remover.'
          })
        }
        resolve(true)
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail
        })
      }
    })
  }

  // async update(param: string): Promise<ProductEntity> {
  //   return new Promise(async (resolve, reject) => {
  //     try {

  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // }

  // private readonly produtos: Produto[] = [
  //     new Produto('LIV01', 'Livro TDD e BDD na prática', 29.9),
  //     new Produto('LIV02', 'Livro Iniciando com Flutter', 39.9),
  //     new Produto('LIV03', 'Inteligência artificial como serviço', 29.9),
  //   ];

  //   obterTodos(): Produto[] {
  //     return this.produtos;
  //   }

  //   obterUm(id: number): Produto {
  //     return this.produtos[0];
  //   }

  //   criar(produto: Produto) {
  //     this.produtos.push(produto);
  //   }

  //   alterar(produto: Produto): Produto {
  //     return produto;
  //   }

  //   apagar(id: number) {
  //     this.produtos.pop();
  //   }
}
