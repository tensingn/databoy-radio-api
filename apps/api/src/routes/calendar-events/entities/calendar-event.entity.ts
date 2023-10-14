import { CalendarEventType } from './calendar-event-type.entity';

export class CalendarEvent {
  calendarEventId: number;

  title: string;

  startTime: Date;

  endTime: Date;

  description: string;

  calendarEventType: CalendarEventType;
}
