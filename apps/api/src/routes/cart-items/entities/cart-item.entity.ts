import { Product } from '../../products/entities/product.entity';
import { Size } from '../../products/entities/size.entity';

export class CartItem {
  cartItemId: number;

  product: Product;

  quantity: number;

  size: Size;
}
