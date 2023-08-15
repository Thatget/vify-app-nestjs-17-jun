import { LATEST_API_VERSION } from '@shopify/shopify-api';
import { shopifyApp } from '@shopify/shopify-app-express';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';
import { MySQLSessionStorage } from '@shopify/shopify-app-session-storage-mysql';

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
  },
  auth: {
    path: '/api/auth',
    callbackPath: '/api/auth/callback',
  },
  webhooks: {
    path: '/api/webhooks',
  },
  sessionStorage: MySQLSessionStorage.withCredentials(
    'localhost',
    'vify_database',
    'root',
    'root',
    { connectionPoolLimit: 10 }, // optional
  ),
});

export default shopify;
