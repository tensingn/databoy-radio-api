import { Module } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { CalendarEvent } from './entities/calendar-event.entity';
import { DateService } from '../../services/date/date.service';
import { CalendarEventType } from './entities/calendar-event-type.entity';
import { CalendarEventLocation } from './entities/calendar-event-location.entity';
import { CalendarEventMapperService } from './services/calendar-event-mapper.service';
import { SubscribersService } from '../subscribers/subscribers.service';
import { Subscriber } from '../subscribers/entities/subscriber.entity';
import { CalendarEventSubscription } from './entities/calendar-event-subscription.entity';

@Module({
  imports: [],
  controllers: [CalendarEventsController],
  providers: [
    CalendarEventsService,
    DateService,
    CalendarEventMapperService,
    SubscribersService,
  ],
})
export class CalendarEventsModule {}
