import { Product } from '../../products/entities/product.entity';
import { Size } from '../../products/entities/size.entity';

export class CartItemDto {
  id: number;
  product: Product;
  quantity: number;
  size: Size;
}
