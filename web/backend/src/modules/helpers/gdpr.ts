import { DeliveryMethod } from "@shopify/shopify-api";
import { WebhookHandlersParam } from "@shopify/shopify-app-express";
import shopify from "./shopify"
const GDPRWebhookHandlers: WebhookHandlersParam = {
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/api/webhooks",
      callback: async (topic, shop, body, webhookId, next) => {
        console.log("Quyet helper !")
        const payload = JSON.parse(body);
      },
  },
    CUSTOMERS_DATA_REQUEST: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shop, rawBody, webhookId) => {
            const payload = JSON.parse(rawBody);
        },
    },

    /**
     * Store owners can request that data is deleted on behalf of a customer. When
     * this happens, Shopify invokes this webhook.
     *
     * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-redact
     */
    CUSTOMERS_REDACT: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shop, rawBody, webhookId) => {
          const payload = JSON.parse(rawBody);
        },
    },

    /**
     * 48 hours after a store owner uninstalls your app, Shopify invokes this
     * webhook.
     *
     * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#shop-redact
     */
    SHOP_REDACT: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shop, rawBody, webhookId) => {
            const payload = JSON.parse(rawBody);
            // Delete session
            const sessions = await shopify.config.sessionStorage.findSessionsByShop(
                payload.shop_domain
            );
            const sessionIds = sessions.map((session) => session.id);
            await shopify.config.sessionStorage.deleteSessions(sessionIds);
        },
    },
}

/**
 * @type {{[key: string]: import("@shopify/shopify-api").WebhookHandler}}
 */
export default GDPRWebhookHandlers
