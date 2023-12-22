export class GetProductDto {
  id: string;
  name: string;
  pluralName: string;
  type: string;
  price: number;
  imageURLs: Array<string>;
  releaseDate: Date;
  sizes: Array<string>;
}
