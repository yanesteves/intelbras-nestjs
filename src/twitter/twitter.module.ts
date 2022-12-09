import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { twitterProviders } from './twitter.providers';

@Module({
  controllers: [TwitterController],
  providers: [
    ...databaseProviders,
    ...twitterProviders,
    TwitterService,    
  ]
})
export class TwitterModule {}
