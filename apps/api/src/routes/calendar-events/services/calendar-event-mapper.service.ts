import { Injectable } from '@nestjs/common';
import { GetCalendarEventSubscriptionDto } from '../dto/get-calendar-event-subscription.dto';
import { GetCalendarEventDto } from '../dto/get-calendar-event.dto';
import { CalendarEventSubscription } from '../entities/calendar-event-subscription.entity';
import { CalendarEvent } from '../entities/calendar-event.entity';

@Injectable()
export class CalendarEventMapperService {
  calendarEventToGetCalendarEventDto(
    calendarEvent: CalendarEvent,
  ): GetCalendarEventDto {
    let { calendarEventSubscriptions, ...partialDto } = calendarEvent;
    return {
      subscribers: calendarEventSubscriptions.length,
      subscribersGoing: calendarEventSubscriptions.filter((sub) => sub.isGoing)
        .length,
      ...partialDto,
    };
  }

  calendarEventsToGetCalendarEventDtos(
    calendarEvents: CalendarEvent[],
  ): GetCalendarEventDto[] {
    let dtos: GetCalendarEventDto[] = [];
    calendarEvents.forEach((calendarEvent) => {
      dtos.push(this.calendarEventToGetCalendarEventDto(calendarEvent));
    });

    return dtos;
  }

  calendarEventSubscriptionToCalendarEventSubscriptionDto(
    calendarEventSubscription: CalendarEventSubscription,
  ): GetCalendarEventSubscriptionDto {
    return { isGoing: calendarEventSubscription.isGoing };
  }
}
