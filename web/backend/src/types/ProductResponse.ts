interface ProductResponse {
  id: number;
  title: string;
  image: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  selected?: boolean;
}

export default ProductResponse;
