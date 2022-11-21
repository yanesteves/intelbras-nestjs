import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Semana09Module } from './semana09/semana09.module';

@Module({
  imports: [Semana09Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
