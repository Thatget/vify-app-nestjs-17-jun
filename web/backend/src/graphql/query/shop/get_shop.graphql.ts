export const GET_SHOP = `{
  shop {
    id
    name
    email
    contactEmail
    currencyCode
    ianaTimezone
    myshopifyDomain
    orderNumberFormatPrefix
    orderNumberFormatSuffix
    plan {
      displayName
      partnerDevelopment
      shopifyPlus
    }
  }
}`;
