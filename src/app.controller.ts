import { Body, Controller, Get, Post,Request, ValidationPipe, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { CredentialsDTO } from './core/auth/dto/credentials.dto';
import { Roles } from './core/auth/guards/decorator/roles.decorator';
import { GoogleOAuthGuard } from './core/auth/guards/google-oauth.guard';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { RolesGuard } from './core/auth/guards/roles.guard';
import { CreateUserDTO } from './usuarios/dto/create-user-dto';
import { UserRole } from './usuarios/enum/user.role';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) { }

    @Get('/auth/with-google')
    @UseGuards(GoogleOAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async googleAuth(@Request() req) {
    }

    @Get('/auth/google-redirect')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req) {
      if (!req.user) {
        return 'Sem usuário retornado do google';
      }

      return {
        mensagem: 'Google Info',
        user: req.user
      }
    }
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/auth/me')
  async me(@Request() req) {
    console.log(req)
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Roles(UserRole.ADMIN)
  @Get('/admin')  
  async adminRoute() {
    return 'Você tem acesso.'
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
