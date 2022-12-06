import { Body, Controller, Get, Post, ValidationPipe, Headers, ForbiddenException } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { CredentialsDTO } from './core/auth/dto/credentials.dto';
import { CreateUserDTO } from './usuarios/dto/create-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/auth/me')
  async me(@Headers('authorization') authorizationToken) {
    try {
      const validate = await this.authService.validateToken(authorizationToken)
      return {
        validate
      }
    } catch (error) {
      throw new ForbiddenException()
    }
  }

  @Post('/auth/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDTO) {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado.'
    }
  }

  @Post('/auth/signin')
  async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDTO
  ) {
    return await this.authService.signIn(credentialsDto);
  }
}
