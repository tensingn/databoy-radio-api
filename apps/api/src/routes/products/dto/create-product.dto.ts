import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  pluralName: string;

  @IsNotEmpty()
  type: string;

  @IsNumber()
  price: number;

  @IsArray()
  imageURLs: Array<string>;

  @IsDate()
  @Type(() => Date)
  releaseDate: Date;

  @IsArray()
  sizes: Array<string>;
}
