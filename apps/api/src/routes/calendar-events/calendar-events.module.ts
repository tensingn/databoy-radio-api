import { Module } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';
import { DateService } from '../../services/date/date.service';
import { CalendarEventType } from './entities/calendar-event-type.entity';
import { CalendarEventLocation } from './entities/calendar-event-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CalendarEvent,
      CalendarEventType,
      CalendarEventLocation,
    ]),
  ],
  controllers: [CalendarEventsController],
  providers: [CalendarEventsService, DateService],
})
export class CalendarEventsModule {}
