export class CreateProductDto {
    id: string;
    productId: string;
    title: string;
    productDescription: string;
    imageURL: string;
    variants: string;
    store_id: number;
}
