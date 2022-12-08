import { Repository } from 'typeorm';
import { CreateUserDto } from './../dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
// import { CreateTwitterDto } from './dto/create-twitter.dto';
// import { UpdateTwitterDto } from './dto/update-twitter.dto';

@Injectable()
export class TwitterService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  create(usuario: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const userToSave = this.userRepository.create(usuario);
        resolve(await this.userRepository.save(userToSave));
      } catch (error) {
        reject(error);
      }
    });
  }
  
  // create(createTwitterDto: CreateTwitterDto) {
  //   return 'This action adds a new twitter';
  // }

  // findAll() {
  //   return `This action returns all twitter`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} twitter`;
  // }

  // update(id: number, updateTwitterDto: UpdateTwitterDto) {
  //   return `This action updates a #${id} twitter`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} twitter`;
  // }
}
