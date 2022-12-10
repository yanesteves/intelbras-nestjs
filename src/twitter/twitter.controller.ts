import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateTweetDTO } from './dto/create-tweet.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { FollowService } from './services/follow.service';
import { TweetService } from './services/tweet.service';
import { UserService } from './services/user.service';

@UseGuards(JwtAuthGuard)
@Controller('twitter')
export class TwitterController {
  
  constructor(private readonly followService: FollowService,
    private readonly tweetService: TweetService,
    private readonly userService: UserService) {}
  
  @Patch('/update-account')
  async updateAccount(@Request() request, @Body() body: UpdateUserDTO) {
    return await this.userService.updateAccount(request.user, body);
  }

  @Get('/:username')
  async accessUserProfile(@Request() request, @Param('username') username: string) {
    return await this.userService.accessUserProfile(request.user, username);
  }
  
  @Post('/tweet')
  async createTweet(@Request() request, @Body() body: CreateTweetDTO) {
    return await this.tweetService.createTweet(request.user, body)
  }

  @Post('/follow/:id')
  async followUser(@Request() request, @Param('id') id: string) {
    return await this.followService.follow(request.user, +id)
  }

  @Get('/tweet/:id')
  async getTweet(@Param('id') id: string) {
    return await this.tweetService.accessTweet(+id);
  }
}
