import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from 'apps/api/src/routes/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find({ relations: ['images'] });
  }

  async findOne(productId: number) {
    let product = await this.productRepository.findOne(productId, {
      relations: ['images'],
    });
    console.log(product);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
