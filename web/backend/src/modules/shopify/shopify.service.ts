import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LATEST_API_VERSION } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';
import { ShopifyApp, shopifyApp } from '@shopify/shopify-app-express';
import { MySQLSessionStorage } from '@shopify/shopify-app-session-storage-mysql';

@Injectable()
export class ShopifyService {
  shopify: ShopifyApp;

  constructor(private readonly configService: ConfigService) {
    // console.log("test", process.env);
    this.shopify = shopifyApp({
      api: {
        apiKey: this.configService.get('shopify.api_key'),
        apiSecretKey: this.configService.get('shopify.api_secret'),
        scopes: this.configService.get('shopify.scopes'),
        // hostName: this.configService.get('app.host'),
        hostScheme: 'https',
        apiVersion: LATEST_API_VERSION,
        restResources,
      },
      auth: {
        path: '/api/auth',
        callbackPath: '/api/auth/callback',
      },
      webhooks: {
        path: '/api/webhooks',
      },
      sessionStorage: MySQLSessionStorage.withCredentials(
        'localhost',
        process.env.DATABASE_NAME,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        {connectionPoolLimit: 10}, // optional
      ),
    });
  }
}
