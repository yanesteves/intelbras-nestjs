import { DataSource } from 'typeorm';
import { FollowEntity } from './entities/follow.entity';
// import { HashtagEntity } from './entities/hashtag.entity';
import { TweetEntity } from './entities/tweet.entity';
import { UserEntity } from './entities/user.entity';

export const twitterProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TWEET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TweetEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'FOLLOW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FollowEntity),
    inject: ['DATA_SOURCE'],
  },
];