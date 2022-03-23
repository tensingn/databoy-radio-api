import { Injectable } from '@nestjs/common';
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

  findOne(productId: number) {
    return this.productRepository.findOne(productId, {
      relations: ['images'],
    });
  }
}
