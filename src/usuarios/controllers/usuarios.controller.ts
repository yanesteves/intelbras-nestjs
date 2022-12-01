import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AtualizaUsuarioDTO } from '../dto/atualiza-usuario.dto';
import { CriaUsuarioDTO } from '../dto/criar-usuario.dto';
import { FindOneUserDTO } from '../dto/find-one-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UsuariosService } from '../service/usuarios.service';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {

    constructor(private usuarioService: UsuariosService) { }

    @Get(':id')
    async findOne(@Param() params: FindOneUserDTO, @Res() response: Response): Promise<UserEntity> {
        try {
            const founded = await this.usuarioService.findOne(params);
            if (founded) {
                response.status(HttpStatus.OK).send(founded)
                return founded;
            }
            response.status(HttpStatus.OK).send(`Nenhum usuário encontrado com o ID ${params.id}`)
            // throw new HttpException('Nenhum usuário encontrado com o ID', HttpStatus.OK)   

        } catch (err) {
            throw new HttpException({ reason: err?.detail }, HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        try {
            return await this.usuarioService.findAll();
        } catch (err) {
            throw new HttpException({ reason: err?.detail }, HttpStatus.BAD_REQUEST)
        }
    }

    @Post()
    async insert(@Body() usuario: CriaUsuarioDTO): Promise<UserEntity> {
        try {
            return await this.usuarioService.insert(usuario);
        } catch (err) {
            if (err.code == 23505)
                throw new HttpException({ reason: err.detail }, HttpStatus.CONFLICT);
            throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);

        }
    }

    @Delete(':id')
    async delete(@Param() params: FindOneUserDTO): Promise<boolean> {
        try {
            return await this.usuarioService.delete(params);
        } catch (err) {
            if (err.code === 20000) {
                throw new HttpException({ reason: err.detail }, HttpStatus.OK)
            }
            throw new HttpException({ reason: err.detail }, HttpStatus.NOT_MODIFIED)
        }
    }

    @Put(':id')
    async update(@Param() params: FindOneUserDTO, @Body() usuario: AtualizaUsuarioDTO): Promise<boolean> {
        try {
            return await this.usuarioService.update(params, usuario);
        } catch (err) {
            if (err.code === 20000) {
                throw new HttpException({ reason: err.detail }, HttpStatus.OK)
            }
            throw new HttpException({ reason: err.detail }, HttpStatus.NOT_MODIFIED)
        }
    }

}
