import { MusicDto } from 'apps/api/src/services/music/dto/music.dto';
import { Equals, IsNotEmpty } from 'class-validator';
import { Release } from '../entities/release.entity';

export class CreateReleaseDto extends MusicDto {
  @Equals(Release.name.toLocaleLowerCase())
  type: string;

  @IsNotEmpty()
  releaseDate: Date;

  tracks: Array<string>;
}
