import { IsNotEmpty } from 'class-validator';

export class CreateMixDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  src: string;

  releaseId: number;
}
