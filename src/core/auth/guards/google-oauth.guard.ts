import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    super({
      // Para que o Google possa retornar um token de atualização após a autenticação bem-sucedida
      accessType: 'offline',
    });
  }
}