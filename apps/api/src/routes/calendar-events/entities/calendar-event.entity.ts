import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CalendarEventType } from './calendar-event-type.entity';
import { CalendarEventLocation } from './calendar-event-location.entity';
import { CalendarEventSubscription } from './calendar-event-subscription.entity';

@Entity()
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  calendarEventId: number;

  @Column()
  title: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column('tinytext')
  description: string;

  @Column('text')
  longDescription: string;

  @Column({ length: 2048 })
  descriptionImageUrl: string;

  @ManyToOne(() => CalendarEventType, (type) => type.calendarEvents)
  @JoinColumn({ name: 'calendarEventTypeId' })
  calendarEventType: CalendarEventType;

  @ManyToOne(() => CalendarEventLocation, (location) => location.calendarEvents)
  @JoinColumn({ name: 'calendarEventLocationId' })
  location: CalendarEventLocation;

  @OneToMany(
    () => CalendarEventSubscription,
    (calendarEventSubscription) => calendarEventSubscription.calendarEvent,
  )
  calendarEventSubscriptions: CalendarEventSubscription[];
}
