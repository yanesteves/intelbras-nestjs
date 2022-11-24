import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CriarProdutoDTO } from '../dto/criar-produto.dto';
import { FindProductDTO } from '../dto/find-product.dto';
import { ProductEntity } from '../entities/Produto.entity';
import { ProdutosService } from '../service/produtos.service';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) { }

  @Get(':id')
  async obterUm(@Param() params: FindProductDTO, @Res() response: Response): Promise<ProductEntity> {
    try {
      const founded = await this.produtosService.findOne(params);
      if (founded) {
        response.status(HttpStatus.OK).send(founded)
        return founded;
      }
      response.status(HttpStatus.OK).send(`Nenhum usuário encontrado com o ID ${params.id}`)
    } catch (error) {
      throw new HttpException({ reason: error.detail }, HttpStatus.BAD_REQUEST)
    }

  }

  @Get()
  async obterTodos(): Promise<ProductEntity[]> {
    try {
      return await this.produtosService.find();
    } catch (error) {
      throw new HttpException({ reason: error?.detail }, HttpStatus.BAD_REQUEST)
    }
  }

  @Post()
  async criar(@Body() produto: CriarProdutoDTO): Promise<ProductEntity> {
    try {
      return await this.produtosService.insert(produto);
    } catch (err) {
      if (err.code == 23505)
        throw new HttpException({ reason: err.detail }, HttpStatus.CONFLICT);
      throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async apagar(@Param() params: FindProductDTO): Promise<boolean> {
    try {
      return await this.produtosService.delete(params.id);
    } catch (err) {
      if (err.code === 20000) {
        throw new HttpException({ reason: err.detail }, HttpStatus.OK)
      }
      throw new HttpException({ reason: err.detail }, HttpStatus.NOT_MODIFIED)
    }
  }
}
