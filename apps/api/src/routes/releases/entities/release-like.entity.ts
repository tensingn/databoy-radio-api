import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscriber } from '../../subscribers/entities/subscriber.entity';
import { Release } from './release.entity';

@Entity()
export class ReleaseLike {
  @PrimaryGeneratedColumn()
  releaseLikeId: number;

  @ManyToOne(() => Release, (Release) => Release.likes)
  @JoinColumn({ name: 'releaseId' })
  release: Release;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.releaseLikes)
  @JoinColumn({ name: 'subscriberId' })
  subscriber: Subscriber;
}
