import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CalendarEventType } from './calendar-event-type.entity';

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
}
