import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('api/cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.cartItemsService.findAll();
  }

  @Get(':cartItemId')
  findOne(@Param('cartItemId') cartItemId: number) {
    return this.cartItemsService.findOne(+cartItemId);
  }

  @Patch(':cartItemId')
  update(
    @Param('cartItemId') cartItemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(+cartItemId, updateCartItemDto);
  }

  @Delete(':cartItemId')
  remove(@Param('cartItemId') cartItemId: number) {
    return this.cartItemsService.remove(+cartItemId);
  }
}
