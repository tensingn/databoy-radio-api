export class CreateProductDto {
  name: string;
  pluralName: string;
  type: string;
  price: number;
  images: string[];
  releaseDate: string;
  sizes: string[];
}
