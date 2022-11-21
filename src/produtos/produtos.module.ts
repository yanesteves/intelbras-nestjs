import { Module } from '@nestjs/common';
import { ProdutosController } from './controllers/produtos.controller';
import { ProdutosService } from './service/produtos/produtos.service';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
