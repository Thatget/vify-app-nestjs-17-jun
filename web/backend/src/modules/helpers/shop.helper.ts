import { GraphqlQueryError, Session } from '@shopify/shopify-api';
import shopify from './shopify';
import Shopinfo from 'src/types/ShopInfo';
import { StoreDto } from '../store/dto/store.dto';

interface QueryResponse {
  data: {
    shop: Shopinfo;
  };
}

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
}`;

export default async function fetchShopInfo(
  session: Session,
): Promise<StoreDto> {
  const client = new shopify.api.clients.Graphql({ session });
  try {
    const { body } = await client.query<QueryResponse>({
      data: {
        query: GET_SHOP,
      },
    });
    const { shop } = body.data;
    const shopInfo: StoreDto = {
      name: shop.name,
      shop: shop.myshopifyDomain,
      email: shop.email,
    };
    return shopInfo;
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`,
      );
    } else {
      throw error;
    }
  }
}
