import { BillingInterval, LATEST_API_VERSION } from '@shopify/shopify-api';
import { shopifyApp } from '@shopify/shopify-app-express';
import { SQLiteSessionStorage } from '@shopify/shopify-app-session-storage-sqlite';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';
// const restResources = async () => {
//     await import(
//         `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
//         )
// };
const DB_PATH = `${process.cwd()}/database.sqlite`;
console.log('DB_PATH', DB_PATH);
const sessionDb = new SQLiteSessionStorage(DB_PATH);
console.log('Api version', LATEST_API_VERSION);

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
  sessionStorage: sessionDb,
});

export default shopify;
