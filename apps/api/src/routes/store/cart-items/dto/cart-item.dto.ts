import { Size } from '../../products/entities/size.entity';
import { ProductDto } from '../../products/dto/product.dto';

export class CartItemDto {
  id: number;
  product: ProductDto;
  quantity: number;
  size: Size;
}
