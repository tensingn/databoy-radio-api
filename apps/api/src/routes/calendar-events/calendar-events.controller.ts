import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permissions } from '../../authorization/permissions.decorator';

@Controller('api/calendar-events')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Get()
  findAll(@Query('daysAgo') daysAgo: number) {
    return this.calendarEventsService.findAll(daysAgo);
  }

  @Get(':calendarEventId')
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Permissions('read:calendar_events')
  findOne(@Param('calendarEventId') calendarEventId: number) {
    return this.calendarEventsService.findOne(+calendarEventId);
  }

  @Post()
  createCalendarEvent(@Body() body: CreateCalendarEventDto) {
    return this.calendarEventsService.createCalendarEvent(body);
  }
}
