import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import * as serveStatic from "serve-static";
import * as express from 'express'

const PORT = parseInt(
    process.env.BACKEND_PORT || process.env.PORT || "3002",
    10
);

const STATIC_PATH =
    process.env.NODE_ENV === "production"
        ? `${process.cwd()}/frontend/dist`
        : `${process.cwd()}/frontend/`;

export async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.use(express.json())

    app.use(serveStatic(STATIC_PATH, {index: false}));
    await app.listen(PORT);
}

bootstrap();
