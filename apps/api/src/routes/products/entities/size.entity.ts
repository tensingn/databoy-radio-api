import { Product } from './product.entity';

export class Size {
  sizeId: number;

  name: string;

  products: Product[];
}
