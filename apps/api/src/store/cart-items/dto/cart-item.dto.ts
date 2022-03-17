import { Size } from '../../enums/sizes.enum';
import { ProductDto } from '../../products/dto/product.dto';

export class CartItem {
  id: number;
  product: ProductDto;
  quantity: number;
  size: Size;
}
