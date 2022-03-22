import { Product } from '../../products/entities/product.entity';
import { Size } from '../../products/entities/size.entity';

export class CreateCartItemDto {
  product: Product;
  quantity: number;
  size: Size;
}
