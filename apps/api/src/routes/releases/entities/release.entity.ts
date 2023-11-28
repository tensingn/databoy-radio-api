import { Track } from '../../tracks/entities/track.entity';
import { Music } from 'apps/api/src/services/music/entities/music.entity';

export class Release extends Music {
  title: string;
  tracks: Array<Track>;

  constructor() {
    super(Release.name.toLocaleLowerCase());
    this.title = '';
    this.tracks = new Array<Track>();
  }
}
