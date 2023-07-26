import {GraphqlQueryError} from "@shopify/shopify-api";
import shopify from "./shopify";
// Used for creating some common functions used by the backend to format Products data
// We are adding API layer so that the frontend can access the data
/*
  The app's database stores the productId
  This query is used to get the fields the frontend needs for those IDs.
  By querying the Shopify GraphQL Admin API at runtime, data can't become stale.
  This data is also queried so that the full state can be saved to the database, in order to generate QR code links.
*/

const FETCH_PRODUCTS_QUERY = `
      query ($query: String!, $reverse: Boolean) {
        products(first: 5, query: $query, reverse: $reverse) {
          edges {
            cursor
            node {
              id
              title
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    price
                    title
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`;

const formatGQLResponse = (res) => {
    // edges : an array to hold all data
    const edges = res?.body?.data?.products?.edges || []
    if (!edges.length) return [];
    return edges.map(({node}) => ({
        id: node.id,
        title: node.title,
        image: node.images.edges[0]?.node?.url || "https://w7.pngwing.com/pngs/915/345/png-transparent-multicolored-balloons-illustration-balloon-balloon-free-balloons-easter-egg-desktop-wallpaper-party-thumbnail.png",
        variants: node.variants.edges.map(({node}) => ({
            id: node.id,
            title: node.title,
            price: node.price,
        })),
    }));
};
export default async function fetchProducts(session, title: string, cursor?: string, reverse?: boolean) {
    const client = new shopify.api.clients.Graphql({session});
    try {
      var query = '';
      var after = '';
      query = ` "title:*${title}*"`
      console.log(query);
      // if (cursor) after = `,after: ${after}`
        return formatGQLResponse(await client.query({
            data: {
              query: FETCH_PRODUCTS_QUERY,
              variables: { query, after, reverse: true },
            }
        }))
    } catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(
                `${error.message}\n${JSON.stringify(error.response, null, 2)}`
            );
        } else {
            throw error;
        }
    }
}

export async function getShopUrlFromSession(req, res) {
    return `https://${res.locals.shopify.session.shop}`;
}
