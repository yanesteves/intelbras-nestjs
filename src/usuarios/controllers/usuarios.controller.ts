import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CriaUsuarioDTO } from '../dto/criar-usuario.dto';
import { FindOneUserDTO } from '../dto/find-one-user.dto';
import { Usuario } from '../model/usuario';
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuarioService: UsuariosService) { }


    @Get('erro')
    lancarErro(): string {
        throw new HttpException('Método não implementado', HttpStatus.NOT_IMPLEMENTED);
    }
    // Com validação
    @Get(':id')
    usuario(@Param() params: FindOneUserDTO): string {
        return `param enviado: ${params.id}`;
    }

    @Post()
    criar(@Body() usuario: CriaUsuarioDTO): Usuario {
        return this.usuarioService.criar(usuario);
    }


}
