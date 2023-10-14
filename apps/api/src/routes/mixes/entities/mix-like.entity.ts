import { Subscriber } from '../../subscribers/entities/subscriber.entity';
import { Mix } from './mix.entity';

export class MixLike {
  mixLikeId: number;

  mix: Mix;

  subscriber: Subscriber;
}
