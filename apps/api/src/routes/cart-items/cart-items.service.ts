import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
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

  async findOne(cartItemId: number) {
    let cartItem = await this.entityManager.findOne(CartItem, cartItemId, {
      relations: ['product', 'size'],
    });
    if (!cartItem) {
      throw new HttpException('Cart item not found.', HttpStatus.NOT_FOUND);
    }

    return cartItem;
  }

  async update(cartItemId: number, updateCartItemDto: UpdateCartItemDto) {
    // check that cart item exists
    let cartItem = await this.entityManager.findOne(CartItem, cartItemId, {
      relations: ['product', 'size'],
    });
    if (!cartItem) {
      throw new HttpException('Cart item not found.', HttpStatus.NOT_FOUND);
    }

    // check that product exists - if one is passed in
    cartItem.product = updateCartItemDto.productId
      ? await this.entityManager.findOne(Product, updateCartItemDto.productId)
      : cartItem.product;
    if (!cartItem.product) {
      throw new HttpException('Product not found.', HttpStatus.NOT_FOUND);
    }

    // check that size exists - if one is passed in
    cartItem.size = updateCartItemDto.sizeId
      ? await this.entityManager.findOne(Size, updateCartItemDto.sizeId)
      : cartItem.size;
    if (!cartItem.size) {
      throw new HttpException('Size not found.', HttpStatus.NOT_FOUND);
    }

    // assign quantity if one exists
    cartItem.quantity =
      updateCartItemDto.quantity != null
        ? updateCartItemDto.quantity
        : cartItem.quantity;
    if (cartItem.quantity < 1) {
      throw new HttpException('Invalid quantity.', HttpStatus.BAD_REQUEST);
    }

    return this.entityManager.save(CartItem, cartItem);
  }

  async remove(cartItemId: number) {
    // check that cart item exists
    let cartItem = await this.entityManager.findOne(CartItem, cartItemId);
    if (!cartItem) {
      throw new HttpException('Cart item not found.', HttpStatus.NOT_FOUND);
    }

    return this.entityManager.delete(CartItem, cartItemId);
  }
}
