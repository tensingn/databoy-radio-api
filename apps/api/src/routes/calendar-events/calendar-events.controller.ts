import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { CreateCalendarEventSubscriptionDto } from './dto/create-calendar-event-subscriber';

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

  @Post()
  createCalendarEvent(@Body() body: CreateCalendarEventDto) {
    return this.calendarEventsService.createCalendarEvent(body);
  }

  @Post(':calendarEventId/subscription')
  createCalendrEventSubscription(
    @Param('calendarEventId') calendarEventId: number,
    @Body() body: CreateCalendarEventSubscriptionDto,
  ) {
    return this.calendarEventsService.createCalendarEventSubscription(
      calendarEventId,
      body,
    );
  }
}
