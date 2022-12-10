import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTweetDTO } from '../dto/create-tweet.dto';
import { TweetEntity } from '../entities/tweet.entity';
import { UserEntity } from '../entities/user.entity';
import { JwtPayloadUser } from '../utils/jwt-payload-user';

@Injectable()
export class TweetService {

    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<UserEntity>,

        @Inject('TWEET_REPOSITORY')
        private readonly tweetRepository: Repository<TweetEntity>
    ) { }

    accessTweet(id: number) {
        return new Promise(async (resolve, reject) => {
            const tweet = await this.tweetRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    user: true
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        id: true,
                        name: true,
                        username: true
                    }
                }
            })

            if (!tweet) {
                reject('Não foi encontrado tweet com este id.')
            }

            resolve(tweet)
        })
    }

    createTweet(userPayload: JwtPayloadUser, tweet: CreateTweetDTO) {
        return new Promise(async (resolve, reject) => {
            try {
                // Crio uma instância de user para realizar um relacionamento com tweet.
                const user = this.userRepository.create(userPayload);

                const tweetInstance = this.tweetRepository.create();
                tweetInstance.content = tweet.content;
                tweetInstance.user = user;

                resolve(await this.tweetRepository.save(tweetInstance));
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })
    }




}
