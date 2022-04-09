import { IsNumber } from 'class-validator';

export class CreateMixLikeDto {
  @IsNumber()
  subscriberId: number;
}
