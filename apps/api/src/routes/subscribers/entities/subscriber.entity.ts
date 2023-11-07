import { TrackLike } from '../../tracks/entities/track-like.entity';
import { ReleaseLike } from '../../releases/entities/release-like.entity';

export class Subscriber {
  subscriberId: number;

  email: string;

  releaseLikes: ReleaseLike[];

  trackLikes: TrackLike[];
}
