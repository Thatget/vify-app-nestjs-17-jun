import { Injectable } from '@nestjs/common'
import { SUBSCRIPTION_WEBHOOK } from '../../graphql/mutation/webhook.mutation'
import shopify from '../helpers/shopify'
import { Session } from '@shopify/shopify-api'
import { WEBHOOK_TOPIC, WebhookSubscriptionInput } from '../../types/webhook'

@Injectable()
export class WebhookService {
  constructor() { }

  public async createWebhook( session: Session, payload: { topic: WEBHOOK_TOPIC, input: WebhookSubscriptionInput }) {
    const client = new shopify.api.clients.Graphql({session});
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
