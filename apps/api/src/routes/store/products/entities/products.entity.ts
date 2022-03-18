import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from './images.entity';

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

  sizes: string[];
}
