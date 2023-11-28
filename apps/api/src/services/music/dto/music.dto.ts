import { IsEmpty, IsNotEmpty } from 'class-validator';

export abstract class MusicDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  title: string;

  // only want likes for internal setting, not to be explicitly sent from client
  @IsEmpty()
  numLikes: number;
}
