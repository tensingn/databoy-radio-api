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

  @Get(':productId')
  async findOne(@Param('productId') productId: number): Promise<Product> {
    return this.productsService.findOne(+productId);
  }

  @Get('snipcart/:productId')
  async findOneSnipCart(
    @Param('productId') productId: number,
  ): Promise<Product> {
    return this.productsService.findOne(+productId, true);
  }
}
