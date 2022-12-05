import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from 'src/users/users.providers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'abcdefghijklmnopqrstuvwxyz',
      signOptions: {
        expiresIn: 60
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    // UserService,
    ...databaseProviders,
    ...userProviders,
    AuthService    
  ]
})
export class AuthModule {}
