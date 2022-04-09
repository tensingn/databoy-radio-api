import { IsNumber } from 'class-validator';

export class CreateReleaseLikeDto {
  @IsNumber()
  subscriberId: number;
}
