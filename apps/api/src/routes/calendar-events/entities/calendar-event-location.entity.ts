import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CalendarEvent } from './calendar-event.entity';

@Entity()
export class CalendarEventLocation {
  @PrimaryGeneratedColumn()
  calendarEventLocationId: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  isVirtual: boolean;

  @OneToMany(() => CalendarEvent, (e) => e.location)
  calendarEvents: CalendarEvent[];
}
