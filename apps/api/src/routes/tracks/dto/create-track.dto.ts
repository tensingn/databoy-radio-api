import { MusicDto } from 'apps/api/src/services/music/dto/music.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto extends MusicDto {
  @IsNotEmpty()
  src: string;

  releaseID: string;
}
