import { Controller, Get, Param, Query } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';

@Controller('api/calendar-events')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Get()
  findAll(@Query('daysAgo') daysAgo: number) {
    return this.calendarEventsService.findAll(daysAgo);
  }

  @Get(':calendarEventId')
  findOne(@Param('calendarEventId') calendarEventId: number) {
    return this.calendarEventsService.findOne(+calendarEventId);
  }
}
