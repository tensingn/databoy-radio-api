import { ProductDto } from '../../products/dto/product.dto';
import { Size } from '../../enums/sizes.enum';

export class CreateCartItemDto {
  product: ProductDto;
  quantity: number;
  size: Size;
}
