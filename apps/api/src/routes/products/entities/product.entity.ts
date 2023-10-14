import { Size } from './size.entity';
import { Image } from './image.entity';

// don't need any serialization for this entity because
// it doesn't contain any sensitive data

export class Product {
  productId: number;

  // used by snipcart
  id: number;

  name: string;

  pluralName: string;

  type: string;

  price: number;

  images: Image[];

  releaseDate: Date;

  sizes: Size[];
}
