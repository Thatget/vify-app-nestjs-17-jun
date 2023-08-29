// import { GraphqlQueryError } from '@shopify/shopify-api';
// import shopify from './shopify';
// import ProductPage from 'src/types/ProductPage';
// import ProductResponse from 'src/types/ProductResponse';
// Used for creating some common functions used by the backend to format Products data
// We are adding API layer so that the frontend can access the data
/*
  The app's database stores the productId
  This query is used to get the fields the frontend needs for those IDs.
  By querying the Shopify GraphQL Admin API at runtime, data can't become stale.
  This data is also queried so that the full state can be saved to the database, in order to generate QR code links.
*/

// const FETCH_PRODUCTS_QUERY = `
//       query ($query: String!, $after: String, $reverse: Boolean) {
//         products(first: 5, after: $after, query: $query, reverse: $reverse) {
//           edges {
//             node {
//               id
//               title
//               images(first: 1) {
//                 edges {
//                   node {
//                     url
//                   }
//                 }
//               }
//               variants(first: 100) {
//                 edges {
//                   node {
//                     id
//                     price
//                     title
//                   }
//                 }
//               }
//             }
//           }
//           pageInfo {
//             hasNextPage
//             endCursor
//           }
//         }
//       }`;

// const formatGQLResponse = (res): ProductPage => {
//   // edges : an array to hold all data
//   const edges = res?.body?.data?.products?.edges || [];
//   const pageInfo = res?.body?.data?.products?.pageInfo || [];
//   var productList: ProductResponse[] = [];
//   if (edges.length) {
//     var productList: ProductResponse[] = edges.map(({ node }) => ({
//       id: node.id,
//       title: node.title,
//       image: node.images.edges[0]?.node?.url || '',
//       variants: node.variants.edges.map(({ node }) => ({
//         id: node.id,
//         title: node.title,
//         price: node.price,
//         selected: false,
//       })),
//     }));
//   }
//   return { productList, pageInfo };
// };
// export default async function fetchProducts(
//   session,
//   title: string,
//   cursor?: string,
//   reverse?: boolean,
// ) {
//   const client = new shopify.api.clients.Graphql({ session });
//   try {
//     const query = `'${title}*'`;
//     var after = after ? after : null;
//     if (!(reverse === false)) reverse = true;
//     return formatGQLResponse(
//       await client.query({
//         data: {
//           query: FETCH_PRODUCTS_QUERY,
//           variables: { query, reverse, after },
//         },
//       }),
//     );
//   } catch (error) {
//     if (error instanceof GraphqlQueryError) {
//       throw new Error(
//         `${error.message}\n${JSON.stringify(error.response, null, 2)}`,
//       );
//     } else {
//       throw error;
//     }
//   }
// }

export async function getShopUrlFromSession(req, res) {
  return `https://${res.locals.shopify.session.shop}`;
}
