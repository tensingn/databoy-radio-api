import { ProductDto } from '../../products/dto/product.dto';
import { Size } from '../../products/entities/size.entity';

export class CreateCartItemDto {
  product: ProductDto;
  quantity: number;
  size: Size;
}
