import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Size } from './size.entity';
import { Image } from './image.entity';

// don't need any serialization for this entity because
// it doesn't contain any sensitive data

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  // used by snipcart
  id: number;

  @Column()
  name: string;

  @Column()
  pluralName: string;

  @Column()
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @Column()
  releaseDate: Date;

  @ManyToMany(() => Size, (size) => size.products)
  @JoinTable()
  sizes: Size[];
}
