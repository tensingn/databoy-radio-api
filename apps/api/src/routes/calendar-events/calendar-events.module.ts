import { Module } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { CalendarEvent } from './entities/calendar-event.entity';
import { DateService } from '../../services/date/date.service';
import { CalendarEventType } from './entities/calendar-event-type.entity';

@Module({
  imports: [],
  controllers: [CalendarEventsController],
  providers: [CalendarEventsService, DateService],
})
export class CalendarEventsModule {}
