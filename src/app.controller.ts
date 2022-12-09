import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { CreateUserDto } from './twitter/dto/create-user.dto';
import { CredentialsDTO } from './twitter/dto/credentials.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('/auth/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado.',
    };
  }

  @Post('/auth/signin')
  async signIn(@Body() credentials: CredentialsDTO) {
    try {
      return await this.authService.signIn(credentials);
    } catch (error) {
      throw new HttpException(
        { mensagem: 'Usuário ou senha inválidos' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
