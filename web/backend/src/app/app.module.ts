import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {
    MiddlewareConsumer,
    NestModule,
    RequestMethod,
} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {join} from "path";
import {Request, Response, NextFunction} from "express";
import {readFileSync} from "fs";
import {StoreModule} from '../modules/store/store.module';
import {AuthModule} from '../modules/auth/auth.module';
import {DatabaseModule} from '../modules/database/database.module';
import {ProductModule} from "../modules/product/product.module";
import { QuoteModule } from '../modules/quote/quote.module';  
import { QuoteEntityModule } from '../modules/quote_entity/quote_entity.module';
import { StoreFrontendModule } from '../modules/store-frontend/store-frontend.module';
import configuration from '../config/configuration';
import { WebhookModule } from '../modules/webhook/webhook.module';
import { WebhookController } from '../modules/webhook/webhook.controller';
import { RawBodyMiddleware } from '../middleware/raw-body.middleware';
import { JsonBodyMiddleware } from '../middleware/json-body.middleware';
import { ShopifyModule } from '../modules/shopify/shopify.module';
import { ShopifyService } from '../modules/shopify/shopify.service';
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
    imports: [
      ShopifyModule,
        AuthModule,
        StoreModule,
        ProductModule,
        QuoteModule,
        WebhookModule,
        QuoteEntityModule,
        StoreFrontendModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
        DatabaseModule,
      ServeStaticModule.forRoot({
        rootPath: join(process.cwd(), '/../frontend/dist'),
      }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    private readonly configService: ConfigService,
    private readonly shopifyService: ShopifyService,
  ) {

  }
  configure(consumer: MiddlewareConsumer) {
    const node_env = this.configService.get<string>('app.node_env')
    const STATIC_PATH =
      node_env === 'production'
        ? `${process.cwd()}/../frontend/dist/`
        : `${process.cwd()}/../frontend/`;

    consumer
    .apply(RawBodyMiddleware)
    .forRoutes(WebhookController)
    .apply(JsonBodyMiddleware)
    .forRoutes('*')

    // Authentication Middleware
    consumer.apply(this.shopifyService.shopify.auth.begin()).forRoutes({
      path: this.shopifyService.shopify.config.auth.path,
      method: RequestMethod.GET,
    });
    consumer.apply(this.shopifyService.shopify.auth.callback()).forRoutes({
        path: this.shopifyService.shopify.config.auth.callbackPath,
        method: RequestMethod.GET,
    });

    // Validate Authenticated Session Middleware for Backend Routes
    consumer.apply(this.shopifyService.shopify.validateAuthenticatedSession())
    .exclude(
      { path: "/api/auth", method: RequestMethod.ALL },
      { path: "/api/auth/(.*)", method: RequestMethod.ALL },
      { path: "/api/webhooks", method: RequestMethod.ALL },
      { path: "/api/proxy/(.*)", method: RequestMethod.ALL }
      )
    .forRoutes({path: "/api/*", method: RequestMethod.ALL});

    // Ensure Installed On Shop Middleware for Client Routes.
    // Except for backend routes /api/(.*)
    consumer
      .apply(
        this.shopifyService.shopify.ensureInstalledOnShop(),
        (_req: Request, res: Response, _next: NextFunction) => {
          return res
            .status(200)
            .set('Content-Type', 'text/html')
            .send(readFileSync(join(STATIC_PATH, 'index.html')));
        },
      )
      .exclude({ path: '/api/(.*)', method: RequestMethod.ALL })
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
