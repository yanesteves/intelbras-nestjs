import { Module } from '@nestjs/common';
import { TwitterService } from './service/twitter.service';
import { TwitterController } from './controller/twitter.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { twitterProviders } from './twitter.providers';

@Module({
  controllers: [TwitterController],
  providers: [
    TwitterService,
    ...databaseProviders,
    ...twitterProviders,
  ]
})
export class TwitterModule {}
