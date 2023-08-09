import { Injectable } from '@nestjs/common'
import { SUBSCRIPTION_WEBHOOK } from '../../graphql/mutation/webhook.mutation'
import shopify from '../helpers/shopify'
import { Session } from '@shopify/shopify-api'
import { WEBHOOK_TOPIC, WebhookSubscriptionInput } from '../../types/webhook'
import { GraphqlClient } from '@shopify/shopify-api/lib/clients/graphql/graphql_client'

@Injectable()
export class WebhookService {
  private session: Session
  private client: GraphqlClient
  constructor(
    session: Session
    ) {
      this.session = session;
    this.client = new shopify.api.clients.Graphql({session: this.session});
  }

  public async createWebhook( payload: { topic: WEBHOOK_TOPIC, input: WebhookSubscriptionInput }) {
    return await this.client.query({
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
