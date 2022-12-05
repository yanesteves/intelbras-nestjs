import { ForbiddenException, Inject, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { resolve } from 'path';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserEntity>
        ) {}

    async signUp(createUserDto: CreateUserDTO): Promise<UserEntity> {
        if (createUserDto.password != createUserDto.confirm_password) {
            throw new UnprocessableEntityException('As senhas não conferem.')
        }
        return await this.createUser(createUserDto)
    }

    async signIn(credentials: CredentialsDTO) {
        const user = await this.checkCredentials(credentials);
        if (user === null) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos')
        }

        const jwtPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        const token = await this.jwtService.sign(jwtPayload);
        return { token }
    }

    createUser(createUser: CreateUserDTO): Promise<UserEntity> {
        return new Promise(async (resolve) => {            
            const { email, name, password } = createUser;
            const user = this.userRepository.create()
            user.email = email;
            user.name = name;
            user.salt = await bcrypt.genSalt();
            user.confirmationToken = '';
            user.recoverToken = '';
            user.password = await this.hashPassword(password, user.salt);
            const userCreated = await this.userRepository.save(user);
            delete userCreated.password;
            delete user.salt;
            resolve(user);
        })
    }

    async checkCredentials(credentials: CredentialsDTO) {
        const { email, password } = credentials;
        const user = await this.userRepository.findOne({
            where: {
                email, status: true
            }
        })

        if (user && (await user.checkPassword(password))) {
            return user;
        }
        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    validateToken(jwtToken: string) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.jwtService.verifyAsync(jwtToken, {
                    ignoreExpiration: false
                }))                
            } catch (error) {
                reject({
                    code: 401,
                    detail: 'JWT expired.'
                })
            }
        })
    }

    decodedToken(jwtToken: string) {
        return this.jwtService.decode(jwtToken);
    }

}
