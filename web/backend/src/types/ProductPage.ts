import ProductResponse from "./ProductResponse"

interface ProductPage {
  productList: ProductResponse[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  }
}

export default ProductPage
