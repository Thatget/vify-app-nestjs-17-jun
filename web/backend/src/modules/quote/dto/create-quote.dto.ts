import ProductInQuote from 'src/types/ProductInQuote';

export class CreateQuoteDto {
  product: ProductInQuote;
  name: string;
  email: string;
  message: string;
  store_id: number;
}
