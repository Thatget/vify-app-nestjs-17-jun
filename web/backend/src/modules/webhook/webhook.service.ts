import { Injectable } from '@nestjs/common'
import { SUBSCRIPTION_WEBHOOK } from '../../graphql/mutation/webhook.mutation'
import { Session } from '@shopify/shopify-api'
import { WEBHOOK_TOPIC, WebhookSubscriptionInput } from '../../types/webhook'
import { ShopifyService } from '../shopify/shopify.service'

@Injectable()
export class WebhookService {
  constructor(
    private readonly shopifyService: ShopifyService
  ) { }

  public async createWebhook( session: Session, payload: { topic: WEBHOOK_TOPIC, input: WebhookSubscriptionInput }) {
    const client = new this.shopifyService.shopify.api.clients.Graphql({session});
    return await client.query({
      data: {
        query: SUBSCRIPTION_WEBHOOK,
        variables: {
          topic: payload.topic,
          webhookSubscription: payload.input
        }
      }
    })
  }
}
