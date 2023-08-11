export const SUBSCRIPTION_WEBHOOK = `
  mutation subscriptionWebhook($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
    webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
      webhookSubscription {
        id
        topic
        endpoint {
          ... on WebhookHttpEndpoint {
            callbackUrl
          }
        }
        format
        createdAt
        updatedAt
      }
      userErrors {
        field,
        message
      }
    }
  }
`

export const UPDATE_WEBHOOK = `
  mutation updateWebhook($id: ID!, $webhookSubscription: WebhookSubscriptionInput!) {
    webhookSubscriptionUpdate(id: $id, webhookSubscription: $webhookSubscription) {
      userErrors {
        field
        message
      }
      webhookSubscription {
        id
        endpoint
      }
    }
  }
`
