import { Like } from 'apps/api/src/services/likes/entities/like.entity';

export class TrackLike extends Like {
  trackTitle: string;

  constructor() {
    super(TrackLike.name.toLocaleLowerCase());
    this.trackTitle = '';
  }
}
