import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CalendarEvent } from './calendar-event.entity';

@Entity()
export class CalendarEventType {
  @PrimaryGeneratedColumn()
  calendarEventTypeId: number;

  @Column()
  name: string;

  @OneToMany(() => CalendarEvent, (e) => e.calendarEventType)
  calendarEvents: CalendarEvent[];
}
