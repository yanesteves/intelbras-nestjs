import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OutputUserDTO } from '../dto/output-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtPayloadUser } from '../utils/jwt-payload-user';
import { FollowService } from './follow.service';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
        private readonly followService: FollowService) { }

    accessUserProfile(userPayload: JwtPayloadUser, username: string) {
        return new Promise(async (resolve, reject) => {
            const user: OutputUserDTO = await this.userRepository.findOne({
                where: {
                    username: username
                },
                relations: {
                    tweets: true
                },
                select: {
                    id: true,
                    name: true,
                    privateAccount: true,
                    tweets: {
                        id: true,
                        content: true,
                        createdAt: true
                    }
                }
            })

            if (user.privateAccount && !(await this.followService.checkFollow(userPayload.id, user.id)) && user.id !== userPayload.id) {
                reject('Você não segue este usuário.')
            }

            user.followers = await this.followService.followersCount(user.id)
            user.following = await this.followService.followingCount(user.id)

            if (!user) {
                reject('Não foi encontrado usuário com este username.')
            }

            resolve(user)
        })
    }
    
    updateAccount(userPayload: JwtPayloadUser, updateUser: UpdateUserDTO) {
        return new Promise<void>(async (resolve, reject) => {
            await this.userRepository.update(
                {
                    id: userPayload.id
                }, updateUser)            
            resolve();
        })
    }
}