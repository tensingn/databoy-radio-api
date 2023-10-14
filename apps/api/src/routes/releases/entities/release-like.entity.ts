import { Subscriber } from '../../subscribers/entities/subscriber.entity';
import { Release } from './release.entity';

export class ReleaseLike {
  releaseLikeId: number;

  release: Release;

  subscriber: Subscriber;
}
