import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { UserService } from './service/users.service';
import { userProviders } from './users.providers';

@Module({
    controllers: [],
    providers: [
      ...databaseProviders,
      ...userProviders,    
      UserService
    ]  
})
export class UsersModule {}
