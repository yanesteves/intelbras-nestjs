import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTweetDTO } from './dto/create-tweet.dto';
import { HashtagEntity } from './entities/hashtag.entity';
import { TweetEntity } from './entities/tweet.entity';
import { UserEntity } from './entities/user.entity';
import { JwtPayloadUser } from './utils/jwt-payload-user';

@Injectable()
export class TwitterService {

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,

    @Inject('TWEET_REPOSITORY')
    private readonly tweetRepository: Repository<TweetEntity>,

    @Inject('HASHTAG_REPOSITORY')
    private readonly hashtagRepository: Repository<HashtagEntity>,
  ) { }

  accessUserProfile(username: string) {
    return new Promise(async (resolve, reject) => {
      const user = await this.userRepository.findOne({
        where: {
          username: username
        },
        select: {
          name: true,
          username: true,
          tweets: {
            id: true,
            tweet: true
          }
        }
      })

      if (!user) {
        reject('Não foi encontrado usuário com este username.')
      }

      resolve(user)
    })
  }

  accessTweet(id: number) {
    return new Promise(async (resolve, reject) => {
      const tweet = await this.tweetRepository.findOne({
        where: {
          id: id
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
        const hashtags = this.getHashtagsFromTweet(tweet.tweet);
        
        const user = this.userRepository.create()
        user.id = +userPayload.id;
  

        const tweetInstance = this.tweetRepository.create();
        tweetInstance.tweet = tweet.tweet;
        tweetInstance.user = user;
        tweetInstance.addHashtags(hashtags)
  
        user.addTweet(tweetInstance);

        this.userRepository.save(user);
        resolve('Tweet criado com sucesso') 
      } catch (error) {
        console.log(error)
        reject(error)
      }      
    })
  }

  private getHashtagsFromTweet(tweet: string): string[] {
    const parsing = tweet.split(' ');
    const _hashtags = parsing.filter(term => term.startsWith('#', 0) && term.length > 1)
    return _hashtags;
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
