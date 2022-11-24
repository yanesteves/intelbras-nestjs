import { Inject, Injectable } from '@nestjs/common';
import { CriaUsuarioDTO } from 'src/usuarios/dto/criar-usuario.dto';
import { Repository } from 'typeorm';
import { FindOneUserDTO } from '../dto/find-one-user.dto';
import { UserEntity } from '../entities/User.entity';

@Injectable()
export class UsuariosService {

    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserEntity>
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return new Promise(async (resolve, reject) => {
            try {
                /*
                - SQL: SELECT * FROM "users"                                
                - resposta:
                    [UserEntity] ou []
                */
                let found = await this.userRepository.find();
                found = found.map(obj => {
                    let entity = new UserEntity();
                    entity = { ...obj }
                    return entity;
                })
                resolve(found);
            } catch (error) {
                reject(error)
            }
        })
    }

    async findOne(param: FindOneUserDTO): Promise<UserEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                /*                
                - SQL: SELECT * FROM "users" WHERE "id" = x
                - resposta:
                    UserEntity{} ou vazio
                */
                const found = await this.userRepository.findOne({
                    where: param
                })
                resolve(found)
            } catch (error) {
                reject(error)
            }
        })
    }

    async insert(usuario: CriaUsuarioDTO): Promise<UserEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                /*
                - SQL: INSERT INTO "users" VALUES usuario
                - resposta:
                    InsertResult {
                        identifiers: [ 
                            { id: 7 } 
                        ],
                        generatedMaps: [ 
                            { id: 7 } // o id indica qual é o novo PK vinculado ao usuário adicionado.
                        ],
                        raw: [ 
                            { id: 7 } 
                        ]
                    }
                */
                const response = await this.userRepository.insert(usuario)
                console.log('-insert response-')
                console.log(response)
                const { id } = (response).generatedMaps[0];
                let created = new UserEntity();
                created = { ...usuario, id: id }
                resolve(created);
            } catch (error: any) {
                reject({
                    code: error.code,
                    detail: error.detail
                })
            }
        })
    }

    async delete(param: FindOneUserDTO): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                /*
               - SQL: DELETE FROM "users" WHERE id = x
               - resposta:
                  DeleteResult {
                        { 
                            raw: [], 
                            affected: 1 // indica se algum dado foi afetado com a operação, será 0 quando não remover.
                        }
                   }
               */
                const response = await this.userRepository.delete({ id: param.id })
                console.log('-delete response-')
                console.log(response)
                const { affected } = response;
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
}
