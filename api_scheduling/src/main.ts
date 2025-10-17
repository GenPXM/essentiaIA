import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '1mb' }));
  app.use('/audio', express.static(join(process.cwd())));

  const config = new DocumentBuilder()
    .setTitle('API de Agendamentos - EssentiaIA')
    .setDescription(
      'Documentação da API de agendamentos desenvolvida com NestJS, incluindo autenticação JWT, pacientes e agendamentos.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Adicione o token JWT para endpoints protegidos.',
        in: 'header',
      },
      'JWT-auth', 
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, 
    },
  });
  await app.listen(3000);
  console.log('API listening on http://localhost:3000');
  console.log('Swagger disponível em http://localhost:3000/api');
}

bootstrap();
