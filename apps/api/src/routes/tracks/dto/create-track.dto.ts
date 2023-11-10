import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  src: string;

  release: string;
}
