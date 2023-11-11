import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  src: string;

  release: string;

  // only want likes for internal setting, not to be explicitly sent from client
  @IsEmpty()
  likes: number;
}
