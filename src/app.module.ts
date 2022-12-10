import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './core/auth/auth.service';
import { databaseProviders } from './core/database/database.providers';
import { JwtStrategy } from './core/auth/guards/strategy/jwt.strategy';
import { TwitterModule } from './twitter/twitter.module';
import { twitterProviders } from './twitter/twitter.providers';

@Module({
  imports: [    
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true 
    }),
    JwtModule.register({
      secret: 'jb2KURr1O89JjfcvCPIZkh3qQQ',
      signOptions: {
        expiresIn: 60 * 6 * 4
      }
    }),
    TwitterModule
  ],
  controllers: [AppController],
  providers: [ 
    ...databaseProviders,
    ...twitterProviders,
    AppService,
    AuthService,
    JwtStrategy,
    // Caso queira RolesGuard global no app
    // Possível problema:
    // Quando está global, ele executará antes do guard anterior
    // portanto a análise do jwt ainda não terá sido feita. Isso signifca que req.user ainda não existe.
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // }
  ],
})
export class AppModule {}
