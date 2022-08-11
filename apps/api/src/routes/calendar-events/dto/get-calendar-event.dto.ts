import { CalendarEventLocation } from '../entities/calendar-event-location.entity';
import { CalendarEventType } from '../entities/calendar-event-type.entity';

export class GetCalendarEventDto {
  calendarEventId: number;
  title: string;
  startTime: Date;
  endTime: Date;
  description: string;
  longDescription: string;
  descriptionImageUrl: string;
  calendarEventType: CalendarEventType;
  location: CalendarEventLocation;
  subscribers: number;
  subscribersGoing: number;
}
