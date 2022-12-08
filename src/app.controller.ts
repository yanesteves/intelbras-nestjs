import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { CreateUserDto } from './twitter/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }


  @Post('/auth/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado.'
    }
  }
}
