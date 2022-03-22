import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Size } from '../../products/entities/size.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  cartItemId: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @ManyToOne(() => Size)
  size: Size;
}
