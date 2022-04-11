import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subscriber } from '../../subscribers/entities/subscriber.entity';
import { Mix } from './mix.entity';

@Entity()
export class MixLike {
  @PrimaryGeneratedColumn()
  mixLikeId: number;

  @ManyToOne(() => Mix, (mix) => mix.likes)
  @JoinColumn({ name: 'mixId' })
  mix: Mix;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.mixLikes)
  @JoinColumn({ name: 'subscriberId' })
  subscriber: Subscriber;
}
