import { Body, Controller, Get, Post,Request, ValidationPipe, Headers, ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { CredentialsDTO } from './core/auth/dto/credentials.dto';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { CreateUserDTO } from './usuarios/dto/create-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/me')
  async me(@Request() req) {
    console.log(req)
    return req.user;
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
