import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TwitterModule } from './twitter/twitter.module';
import { AuthService } from './core/auth/auth.service';
import { userProviders } from './usuarios/usuarios.providers';
import { databaseProviders } from './core/database/database.providers';

@Module({
  imports: [    
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true 
    }),
    JwtModule.register({
      secret: 'jb2KURr1O89JjfcvCPIZkh3qQQ',
      signOptions: {
        expiresIn: 60 * 6
      }
    }),
    TwitterModule,
  ],
  controllers: [AppController],
  providers: [ 
    ...databaseProviders,
    ...userProviders,   
    AppService,
    AuthService
  ],
})
export class AppModule {}
