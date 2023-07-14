export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  app: {
    name: '',
    path: '',
    host: process.env.HOST || '',
  },
  database: {
    host: process.env.DATABASE_HOST|| 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  },
  shopify: {
    api_key: process.env.SHOPIFY_API_KEY,
    api_secret: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SCOPES,
  }
});