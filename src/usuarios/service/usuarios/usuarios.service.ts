import { Injectable } from '@nestjs/common';
import { CriaUsuarioDTO } from 'src/usuarios/dto/criar-usuario.dto';
import { Usuario } from 'src/usuarios/model/usuario';

@Injectable()
export class UsuariosService {

    criar(usuario: CriaUsuarioDTO): Usuario {
        let created = new Usuario();
        created = {...usuario, id: 0};
        return created;
    }
}
