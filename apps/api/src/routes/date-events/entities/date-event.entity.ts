import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CalendarEvent } from '../../calendar-events/entities/calendar-event.entity';

@Entity()
export class DateEvent {
  @PrimaryGeneratedColumn()
  dateEventId: number;

  @Column()
  date: Date;

  @OneToMany(() => CalendarEvent, (e) => e.dateEvent)
  calendarEvents: CalendarEvent[];
}
