import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscriber } from '../../subscribers/entities/subscriber.entity';
import { CalendarEvent } from './calendar-event.entity';

@Entity()
export class CalendarEventSubscription {
  @PrimaryGeneratedColumn()
  calendarEventSubscriptionId: number;

  @ManyToOne(
    () => CalendarEvent,
    (calendarEvent) => calendarEvent.calendarEventSubscriptions,
  )
  @JoinColumn({ name: 'calendarEventId' })
  calendarEvent: CalendarEvent;

  @ManyToOne(
    () => Subscriber,
    (subscriber) => subscriber.calendarEventSubscriptions,
  )
  @JoinColumn({ name: 'subscriberId' })
  subscriber: Subscriber;

  @Column()
  isGoing: boolean;
}
