export class ProductDto {
  productId: number;
  name: string;
  pluralName: string;
  type: string;
  price: number;
  img: string;
  otherImages: string[];
  releaseDate: Date;
  sizes: string[];
}
