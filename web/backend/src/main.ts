import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import * as serveStatic from "serve-static";
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


const STATIC_PATH =
    process.env.NODE_ENV === "production"
        ? `${process.cwd()}/frontend/dist`
        : `${process.cwd()}/frontend/`;

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('port');
  app.useGlobalPipes(new ValidationPipe());
  app.use(serveStatic(STATIC_PATH, {index: false}));
  await app.listen(PORT);
}

bootstrap();
