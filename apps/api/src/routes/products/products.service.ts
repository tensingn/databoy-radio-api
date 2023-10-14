import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from 'apps/api/src/routes/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor() {}

  async findAll(): Promise<Array<Product>> {
    //return this.productRepository.find({ relations: ['images', 'sizes'] });
    return new Array<Product>();
  }

  async findOne(
    productId: number,
    snipcart: boolean = false,
  ): Promise<Product> {
    return new Product();
    // let product: Product = await this.productRepository.findOne(productId, {
    //   select: ['price'],
    //   relations: ['images', 'sizes'],
    // });
    // if (!product) {
    //   throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    // }
    // if (snipcart) {
    //   product.id = product.productId;
    // }
    // return product;
  }
}
