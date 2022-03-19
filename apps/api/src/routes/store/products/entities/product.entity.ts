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

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  pluralName: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @Column()
  releaseDate: Date;

  @ManyToMany(() => Size, (size) => size.products)
  @JoinTable()
  sizes: Size[];
}
