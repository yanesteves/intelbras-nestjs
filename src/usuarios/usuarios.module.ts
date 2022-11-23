import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosService } from './service/usuarios.service';
import { userProviders } from './usuarios.providers';

@Module({
  controllers: [UsuariosController],
  providers: [
    ...databaseProviders,
    ...userProviders,    
    UsuariosService
  ]  
})
export class UsuariosModule {}
