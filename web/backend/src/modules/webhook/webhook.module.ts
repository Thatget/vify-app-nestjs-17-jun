import { Module } from '@nestjs/common'
import { WebhookService } from './webhook.service'
import { WebhookController } from './webhook.controller'
import { Session } from '@shopify/shopify-api'


@Module({
    imports: [
    ],
    controllers: [WebhookController],
    providers: [WebhookService, Session],
    exports: [WebhookService],
})
export class WebhookModule { }
