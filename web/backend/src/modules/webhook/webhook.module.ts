import { Module } from '@nestjs/common'
import { WebhookService } from './webhook.service'
import { WebhookController } from './webhook.controller'
import { StoreModule } from '../store/store.module'
import { ShopifyModule } from '../shopify/shopify.module'


@Module({
    imports: [
      StoreModule,
      ShopifyModule,
    ],
    controllers: [WebhookController],
    providers: [WebhookService],
    exports: [WebhookService],
})
export class WebhookModule { }
