import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { GetProductDto } from './dto/get-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
import { GetProductSnipcartDto } from './dto/snipcart.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getCollection(): Promise<Array<GetProductDto>> {
    return this.productsService.getCollection();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetProductDto> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateProductDto): Promise<GetProductDto> {
    return this.productsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<Object> {
    return this.productsService.update(id, body);
  }

  @Get(':id/snipcart')
  findOneSnipCart(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<GetProductSnipcartDto> {
    const url: string = `${req.protocol}://${req.get('Host')}${
      req.originalUrl
    }`;
    return this.productsService.findOneForSnipcart(id, url);
  }
}
