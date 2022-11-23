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
                const { id } = (await this.userRepository.insert(usuario)).generatedMaps[0];
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
                const { affected } = await this.userRepository.delete({ id: param.id })
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
