import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import * as serveStatic from "serve-static";
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    rawBody: true,
  });
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('port');
  const node_env = configService.get<string>('app.node_env')
  const STATIC_PATH =
  node_env === "production"
      ? `${process.cwd()}/frontend/dist/`
      : `${process.cwd()}/frontend/`;
  app.useGlobalPipes(new ValidationPipe());
  app.use(serveStatic(STATIC_PATH, {index: false}));
  await app.listen(PORT);
}

bootstrap();
