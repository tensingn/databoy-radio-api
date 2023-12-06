import { MusicDto } from 'apps/api/src/services/music/dto/music.dto';
import { Equals, IsNotEmpty } from 'class-validator';
import { Track } from '../entities/track.entity';

export class CreateTrackDto extends MusicDto {
  @Equals(Track.name.toLocaleLowerCase())
  type: string;

  @IsNotEmpty()
  src: string;

  releaseID: string;
}
