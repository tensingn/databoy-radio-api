import { TrackLike } from '../../tracks/entities/track-like.entity';

export class Subscriber {
  subscriberId: number;

  email: string;

  trackLikes: TrackLike[];
}
