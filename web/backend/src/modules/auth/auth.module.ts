import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { StoreModule } from '../store/store.module';
import { ShopifyModule } from '../shopify/shopify.module';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
  imports: [StoreModule, ShopifyModule, WebhookModule],
  controllers: [AuthController]
})
export class AuthModule {}
