import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { create } from 'domain';
import { EntityManager } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Size } from '../products/entities/size.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    // item to be inserted
    let cartItem = new CartItem();

    // set quantity
    cartItem.quantity = createCartItemDto.quantity;

    // find cart item's product
    cartItem.product = await this.entityManager.findOne(
      Product,
      +createCartItemDto.productId,
    );

    // check that this product exists
    if (!cartItem.product) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    // find cart item's size
    cartItem.size = await this.entityManager.findOne(
      Size,
      +createCartItemDto.sizeId,
    );

    // check that this size exists
    if (!cartItem.size) {
      throw new HttpException('Size not found.', HttpStatus.NOT_FOUND);
    }

    return this.entityManager.save(CartItem, cartItem);
  }

  findAll() {
    return this.entityManager.find(CartItem, {
      relations: ['product', 'size'],
    });
  }

  findOne(cartItemId: number) {
    return this.entityManager.findOne(CartItem, cartItemId, {
      relations: ['product', 'size'],
    });
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
