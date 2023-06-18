import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as serveStatic from "serve-static";

const PORT = parseInt (
    process.env.BACKEND_PORT || process.env.PORT || "3002",
    10
);

const STATIC_PATH =
    process.env.NODE_ENV === "production"
        ? `${process.cwd()}/frontend/dist`
        : `${process.cwd()}/frontend/`;

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(serveStatic(STATIC_PATH, { index: false }));
  // app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  //   return res
  //       .status(200)
  //       .set("Content-Type", "text/html")
  //       .send(readFileSync(join(STATIC_PATH, "index.html")));
  // })
  await app.listen(PORT);
  // const server = express()
}
bootstrap();
// export class App {
//   public async start(server: Express) {
//     const app = await NestFactory.create<NestExpressApplication>(
//         AppModule,
//         new ExpressAdapter(server)
//     )
//     app.useGlobalPipes(new ValidationPipe())
//     app.useStaticAssets(STATIC_PATH,{ index: false})
//     await app.listen(PORT)
//   }
// }
