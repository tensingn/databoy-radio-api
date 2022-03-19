import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Size } from './entities/size.entity';
import { Product } from 'apps/api/src/routes/store/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    console.log(await this.productRepository.find());
    return await this.productRepository.find({ relations: ['images'] });
  }

  findOne(productId: number) {
    return null;
    //return mockProducts.find((p) => p.productId === productId);
  }
}
