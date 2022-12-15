import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/errors/http-exception.filter';
// import { SeedsStatic } from './seeds/seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard(new Reflector()));

  const config = new DocumentBuilder()
    .setTitle('DevIn[Intelbras]')
    .setDescription('Módulo 2 - NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  // app.useGlobalFilters(new HttpExceptionFilter());
  // new SeedsStatic.insertSeeds();

  await app.listen(3000);
}
bootstrap();
