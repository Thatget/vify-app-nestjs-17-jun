import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import * as serveStatic from "serve-static";

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
    // app.get("/api/test", async (_req:any, res:any) => {
    //     const data = [
    //         {
    //             id: 1,
    //             name: "Bruce"
    //         },
    //       {
    //         id: 2,
    //         name: "Trunk"
    //       },
    //       {
    //         id: 1,
    //         name: "Mia"
    //       },
    //     ]
    //     res.status(200).send(data)
    // })

    app.use(serveStatic(STATIC_PATH, {index: false}));
    await app.listen(PORT);
    // const server = express()
}

bootstrap();
