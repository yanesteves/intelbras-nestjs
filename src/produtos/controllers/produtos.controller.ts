import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoDto } from '../dto/produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { Produto } from '../model/produto.model';
import { ProdutosService } from '../service/produtos/produtos.service';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) { }
  
    @Get()
    obterTodos(): Produto[] {
      return this.produtosService.obterTodos();
    }
  
    @Get(':id')
    obterUm(@Param() params): Produto {
        return this.produtosService.obterUm(params.id);
    }
  
    @Post()
    criar(@Body() produto: ProdutoDto) {
      this.produtosService.criar(produto);
    }
  
    @Put()
    alterar(@Body() produto: ProdutoDto): Produto {
      return this.produtosService.alterar(produto);
    }
  
    @Delete(':id')
    apagar(@Param() params) {
      this.produtosService.apagar(params.id);
    }
}
