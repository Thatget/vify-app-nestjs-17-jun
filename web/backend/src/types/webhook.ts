export enum WEBHOOK_TOPIC {
  APP_UNINSTALLED = 'APP_UNINSTALLED',
}

export enum WebhookSubscriptionFormat {
  JSON = 'JSON',
  XML = 'XML'
}

export type WebhookSubscriptionInput = {
  callbackUrl?: string,
  format?: WebhookSubscriptionFormat,
  includeFields?: string[],
  metafieldNamespaces?: string[],
  privateMetafieldNamespaces?: string[]
}
