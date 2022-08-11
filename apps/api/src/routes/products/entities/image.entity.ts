import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column({ length: 2048 })
  url: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
