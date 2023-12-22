import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from 'apps/api/src/routes/products/entities/product.entity';
import { InjectCollectionByType } from 'apps/api/src/services/database/firestore/firestore.decorators';
import {
  FirestoreService,
  QueryOptions,
  STANDARD,
} from 'apps/api/src/services/database/firestore/firestore.service';
import { GetProductDto } from '../dto/get-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { Timestamp } from '@google-cloud/firestore';
import { UpdateProductDto } from '../dto/update-product.dto';
import { NotFoundException } from 'apps/api/src/exceptions/not-found.exception';

@Injectable()
export class ProductsService {
  constructor(
    @InjectCollectionByType(Product) private firestoreService: FirestoreService,
  ) {}

  async getCollection(
    queryOptions: QueryOptions = STANDARD,
  ): Promise<Array<GetProductDto>> {
    return (
      await this.firestoreService.getCollection<Product>(queryOptions)
    ).map((p) => this.convertEntityToGetDto(p));
  }

  async findOne(id: string, snipcart: boolean = false): Promise<GetProductDto> {
    const product = await this.firestoreService.getSingle<Product>(id);

    if (!product) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return this.convertEntityToGetDto(product);
    // let product: Product = await this.productRepository.findOne(productId, {
    //   select: ['price'],
    //   relations: ['images', 'sizes'],
    // });
    // if (!product) {
    //   throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    // }
    // if (snipcart) {
    //   product.id = product.productId;
    // }
    // return product;
  }

  async create(createProductDto: CreateProductDto): Promise<GetProductDto> {
    return this.convertEntityToGetDto(
      await this.firestoreService.addSingle<Product>(
        this.convertCreateDtoToEntity(createProductDto),
      ),
    );
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (!product) {
      throw new NotFoundException(Product);
    }

    const { releaseDate, ...dtoNoTimes } = updateProductDto;

    const returnObj = {
      id,
      ...(await this.firestoreService.updateSingle(
        id,
        Object.assign(dtoNoTimes, {
          type: product.type,
          releaseTimestamp: Timestamp.fromDate(
            releaseDate ?? product.releaseDate,
          ),
        }),
      )),
    };

    if (updateProductDto.releaseDate) {
      (returnObj as GetProductDto).releaseDate = (
        returnObj as Product
      ).releaseTimestamp.toDate();
      delete (returnObj as Product).releaseTimestamp;
    }

    return returnObj;
  }

  private convertEntityToGetDto(entity: Product): GetProductDto {
    const { releaseTimestamp, ...entityNoTimestamps } = entity;
    return {
      releaseDate: entity.releaseTimestamp.toDate(),
      ...entityNoTimestamps,
    };
  }

  private convertCreateDtoToEntity(dto: CreateProductDto): Product {
    const { releaseDate, ...dtoNoTimes } = dto;
    return {
      id: '',
      releaseTimestamp: Timestamp.fromDate(releaseDate),
      ...dtoNoTimes,
    };
  }
}
