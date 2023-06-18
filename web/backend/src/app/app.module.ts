import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { join } from "path";
import shopify from "../utils/shopify";
// import { ProductModule } from "./product/product.module.js";
import { Request, Response, NextFunction } from "express";
import { readFileSync } from "fs";
import GDPRWebhookHandlers from "../utils/gdpr";

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// const STATIC_PATH =
//     process.env.NODE_ENV === "production"
//         ? `${process.cwd()}/frontend/dist`
//         : `${process.cwd()}/frontend/`;
const STATIC_PATH = '/Users/Brucenguyen/vify-app-nestjs-17-jun/web/frontend'
console.log("Static path", STATIC_PATH)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Authentication Middleware
    consumer.apply(shopify.auth.begin()).forRoutes({
      path: shopify.config.auth.path,
      method: RequestMethod.GET,
    });
    consumer.apply(shopify.auth.callback()).forRoutes({
      path: shopify.config.auth.callbackPath,
      method: RequestMethod.GET,
    });

    // Validate Authenticated Session Middleware for Backend Routes
    consumer
        .apply(shopify.validateAuthenticatedSession())
        .forRoutes({ path: "/api/*", method: RequestMethod.ALL });

    // Webhooks
    consumer
        .apply(
            ...shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
        )
        .forRoutes({
          path: shopify.config.webhooks.path,
          method: RequestMethod.POST,
        });

    // Ensure Installed On Shop Middleware for Client Routes.
    // Except for backend routes /api/(.*)
    consumer
        .apply(
            shopify.ensureInstalledOnShop(),
            (_req: Request, res: Response, _next: NextFunction) => {
              return res
                  .status(200)
                  .set("Content-Type", "text/html")
                  .send(readFileSync(join(STATIC_PATH, "index.html")));
            }
        )
        .exclude({ path: "/api/(.*)", method: RequestMethod.ALL })
        .forRoutes({ path: "/*", method: RequestMethod.ALL });
  }
}
