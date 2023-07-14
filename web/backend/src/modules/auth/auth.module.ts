import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { StoreModule } from '../store/store.module';
import { ShopifyModule } from '../shopify/shopify.module';

@Module({
  imports: [StoreModule, ShopifyModule],
  controllers: [AuthController]
})
export class AuthModule {}
