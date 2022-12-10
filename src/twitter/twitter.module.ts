import { Module } from '@nestjs/common';
import { TwitterController } from './twitter.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { twitterProviders } from './twitter.providers';
import { UserService } from './services/user.service';
import { TweetService } from './services/tweet.service';
import { FollowService } from './services/follow.service';

@Module({
  controllers: [TwitterController],
  providers: [
    ...databaseProviders,
    ...twitterProviders,
    UserService,
    TweetService,
    FollowService
  ]
})
export class TwitterModule {}
