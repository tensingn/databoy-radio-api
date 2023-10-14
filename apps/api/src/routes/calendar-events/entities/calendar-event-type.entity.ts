import { CalendarEvent } from './calendar-event.entity';

export class CalendarEventType {
  calendarEventTypeId: number;

  name: string;

  calendarEvents: CalendarEvent[];
}
