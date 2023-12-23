import { MusicDto } from 'apps/api/src/services/music/dto/music.dto';
import { Track } from '../../tracks/entities/track.entity';

export class GetReleaseDto extends MusicDto {
  tracks: Array<Track>;
}
