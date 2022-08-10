import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CalendarEventSubscription } from '../../calendar-events/entities/calendar-event-subscription.entity';
import { CalendarEvent } from '../../calendar-events/entities/calendar-event.entity';
import { MixLike } from '../../mixes/entities/mix-like.entity';
import { ReleaseLike } from '../../releases/entities/release-like.entity';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  subscriberId: number;

  @Column()
  email: string;

  @OneToMany(() => ReleaseLike, (releaseLike) => releaseLike.subscriber)
  releaseLikes: ReleaseLike[];

  @OneToMany(() => MixLike, (mixLike) => mixLike.subscriber)
  mixLikes: MixLike[];

  @OneToMany(
    () => CalendarEventSubscription,
    (calendarEventSubscription) => calendarEventSubscription.subscriber,
  )
  calendarEventSubscriptions: CalendarEventSubscription[];
}
