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
import { GetProductSnipcartDto } from '../dto/snipcart.dto';

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

  async findOne(id: string): Promise<GetProductDto> {
    const product = await this.firestoreService.getSingle<Product>(id);

    if (!product) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return this.convertEntityToGetDto(product);
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

  async findOneForSnipcart(
    id: string,
    url: string,
  ): Promise<GetProductSnipcartDto> {
    const product = await this.findOne(id);

    const snipcartDto: GetProductSnipcartDto = {
      id,
      url,
      price: product.price,
    };

    if (product.sizes?.length) {
      snipcartDto.customFields = [
        {
          name: 'Size',
          options: product.sizes.join('|'),
        },
      ];
    }

    return snipcartDto;
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
