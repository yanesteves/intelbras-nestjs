import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateTweetDTO } from './dto/create-tweet.dto';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  // @Patch()
  // updateUser(@Request() request) {
  //   return;
  // }

  @Get('/:username')
  async accessUserProfile(@Param('username') username: string) {
    return await this.twitterService.accessUserProfile(username);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/tweet')
  async createTweet(@Request() request, @Body() body: CreateTweetDTO) {
    return await this.twitterService.createTweet(request.user, body)
  }

  @Get('/tweet/:id')
  async getTweet(@Param('id') id: string) {
    return await this.twitterService.accessTweet(+id);
  }
}
