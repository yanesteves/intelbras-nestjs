import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TwitterService } from '../service/twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.twitterService.create(createUserDto);
  // }
  
  // @Post()
  // create(@Body() createTwitterDto: CreateTwitterDto) {
  //   return this.twitterService.create(createTwitterDto);
  // }

  // @Get()
  // findAll() {
  //   return this.twitterService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.twitterService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTwitterDto: UpdateTwitterDto) {
  //   return this.twitterService.update(+id, updateTwitterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.twitterService.remove(+id);
  // }
}
