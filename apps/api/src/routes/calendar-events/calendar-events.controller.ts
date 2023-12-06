import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CalendarEventsService } from './services/calendar-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { Permissions } from '../../authorization/permissions.decorator';
import { CalendarEvent } from './entities/calendar-event.entity';
import { TransformDatePipe } from '../../pipes/transform-date.pipe';
import { GetCalendarEventDto } from './dto/get-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { Going } from './entities/going.entity';

@Controller('api/calendar-events')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Get()
  // @UseGuards(AuthorizationGuard, PermissionsGuard)
  // @Permissions('read:calendar_events')
  getCollection(
    @Query('startOfRange', new TransformDatePipe()) startOfRange: Date,
    @Query('endOfRange', new TransformDatePipe()) endOfRange: Date,
  ): Promise<Array<GetCalendarEventDto>> {
    return this.calendarEventsService.getCollection(startOfRange, endOfRange);
  }

  @Get(':id')
  // @UseGuards(AuthorizationGuard, PermissionsGuard)
  // @Permissions('read:calendar_events')
  findOne(@Param('id') id: string): Promise<GetCalendarEventDto> {
    return this.calendarEventsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCalendarEventDto): Promise<GetCalendarEventDto> {
    return this.calendarEventsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateCalendarEventDto,
  ): Promise<Object> {
    return this.calendarEventsService.update(id, body);
  }

  @Post(':id/going/:userID')
  addGoing(
    @Param('id') id: string,
    @Param('userID') userID: string,
  ): Promise<Object> {
    return this.calendarEventsService.going(id, userID);
  }

  @Delete(':id/going/:userID')
  removeGoing(
    @Param('id') id: string,
    @Param('userID') userID: string,
  ): Promise<Object> {
    return this.calendarEventsService.going(id, userID, true);
  }

  @Get(':id/going')
  getGoing(@Param('id') id: string): Promise<Array<Going>> {
    return this.calendarEventsService.getGoing(id);
  }

  @Post(':calendarEventId/subscribers')
  createCalendarEventSubscription(
    @Param('calendarEventId') calendarEventId: number,
    @Body() body: CreateCalendarEventSubscriptionDto,
  ) {
    return this.calendarEventsService.createCalendarEventSubscription(
      +calendarEventId,
      body,
    );
  }

  @Get(':calendarEventId/subscribers/:subscriberId')
  getCalendarEventSubscription(
    @Param('calendarEventId') calendarEventId: number,
    @Param('subscriberId') subscriberId: number,
  ) {
    return this.calendarEventsService.findCalendarEventSubscription(
      +calendarEventId,
      +subscriberId,
    );
  }
}
