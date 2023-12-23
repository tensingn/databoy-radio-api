import { Music } from 'apps/api/src/services/music/entities/music.entity';

export class Track extends Music {
  src: string;
  releaseID: string;

  constructor() {
    super(Track.name.toLocaleLowerCase());
    this.src = '';
    this.releaseID = '';
  }
}
