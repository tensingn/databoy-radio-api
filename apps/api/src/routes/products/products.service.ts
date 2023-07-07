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
    return this.productRepository.find({ relations: ['images', 'sizes'] });
  }

  async findOne(productId: number, snipcart: boolean = false) {
    let product: Product = await this.productRepository.findOne(productId, {
      select: ['price'],
      relations: ['images', 'sizes'],
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (snipcart) {
      product.id = product.productId;
    }

    return product;
  }
}
