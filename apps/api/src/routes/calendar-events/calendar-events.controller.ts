import { Controller, Get, Param, Query } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';

@Controller('api/calendar-events')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Get()
  findAll() {
    return this.calendarEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarEventsService.findOne(+id);
  }
}
