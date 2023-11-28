import { MusicDto } from 'apps/api/src/services/music/dto/music.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateReleaseDto extends MusicDto {
  @IsNotEmpty()
  releaseDate: Date;

  tracks: Array<string>;
}
