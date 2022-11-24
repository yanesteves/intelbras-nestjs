import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { ProdutosController } from './controllers/produtos.controller';
import { productsProviders } from './produtos.providers';
import { ProdutosService } from './service/produtos.service';

@Module({
  controllers: [ProdutosController],
  providers: [
    ...databaseProviders,
    ...productsProviders,
    ProdutosService
  ]
})
export class ProdutosModule {}
