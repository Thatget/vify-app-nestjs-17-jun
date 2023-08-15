export const GET_SHOP = `{
  shop {
    id
    name
    billingAddress {
      id
      address1
      address2
      city
      company
      firstName
      lastName
      formattedArea
      latitude
      longitude
      phone
      province
      country
      zip
      countryCodeV2
    }
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
}`
