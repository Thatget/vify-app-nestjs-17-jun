import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import shopify from '../modules/helpers/shopify';
import { Request, Response, NextFunction } from 'express';
import { readFileSync } from 'fs';
import GDPRWebhookHandlers from '../modules/helpers/gdpr';
import { StoreModule } from '../modules/store/store.module';
import { AuthModule } from '../modules/auth/auth.module';
import { DatabaseModule } from '../modules/database/database.module';
import { ProductModule } from '../modules/product/product.module';
import { QuoteModule } from '../modules/quote/quote.module';
import { QuoteEntityModule } from '../modules/quote_entity/quote_entity.module';
import { StoreFrontendModule } from '../modules/store-frontend/store-frontend.module';
import configuration from '../config/configuration';

const STATIC_PATH =
  process.env.NODE_ENV === 'production'
    ? `${process.cwd()}/../frontend/dist`
    : `${process.cwd()}/../frontend/`;

@Module({
  imports: [
    AuthModule,
    StoreModule,
    ProductModule,
    QuoteModule,
    QuoteEntityModule,
    StoreFrontendModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
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
      .exclude(
        { path: '/api/auth/(.*)', method: RequestMethod.ALL },
        {
          path: '/api/webhook/(.*)',
          method: RequestMethod.ALL,
        },
        {
          path: '/api/proxy/(.*)',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes({ path: '/api/*', method: RequestMethod.ALL });

    // Webhooks
    consumer
      .apply(
        ...shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers }),
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
            .set('Content-Type', 'text/html')
            .send(readFileSync(join(STATIC_PATH, 'index.html')));
        },
      )
      .exclude({ path: '/api/(.*)', method: RequestMethod.ALL })
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
