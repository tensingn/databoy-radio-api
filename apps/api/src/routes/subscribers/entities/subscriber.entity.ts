import { MixLike } from '../../mixes/entities/mix-like.entity';
import { ReleaseLike } from '../../releases/entities/release-like.entity';

export class Subscriber {
  subscriberId: number;

  email: string;

  releaseLikes: ReleaseLike[];

  mixLikes: MixLike[];
}
