import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    let product = await this.productsService.findOne(+id);
    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
