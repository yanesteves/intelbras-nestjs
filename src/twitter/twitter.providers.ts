import { DataSource } from 'typeorm';
import { TweetEntity } from './entities/tweet.entity';
import { UserEntity } from './entities/user.entity';

export const twitterProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TWEET_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TweetEntity),
    inject: ['DATA_SOURCE'],
  },
];
