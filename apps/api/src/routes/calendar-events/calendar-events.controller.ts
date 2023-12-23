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
import { TransformDatePipe } from '../../pipes/transform-date.pipe';
import { GetCalendarEventDto } from './dto/get-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { Going } from './entities/going.entity';
import { RolesGuard } from '../../authorization/roles.guard';
import { ROLES, Roles } from '../../authorization/roles.decorator';
import { UserSelfActionGuard } from '../../authorization/user-self-action.guard';

@Controller('api/calendar-events')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Get()
  getCollection(
    @Query('startOfRange', new TransformDatePipe()) startOfRange: Date,
    @Query('endOfRange', new TransformDatePipe()) endOfRange: Date,
  ): Promise<Array<GetCalendarEventDto>> {
    return this.calendarEventsService.getCollection(startOfRange, endOfRange);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetCalendarEventDto> {
    return this.calendarEventsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  create(@Body() body: CreateCalendarEventDto): Promise<GetCalendarEventDto> {
    return this.calendarEventsService.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  update(
    @Param('id') id: string,
    @Body() body: UpdateCalendarEventDto,
  ): Promise<Object> {
    return this.calendarEventsService.update(id, body);
  }

  @Post(':id/going/:userID')
  @UseGuards(AuthorizationGuard, RolesGuard, new UserSelfActionGuard('userID'))
  @Roles(ROLES.USER, ROLES.ADMIN)
  addGoing(
    @Param('id') id: string,
    @Param('userID') userID: string,
  ): Promise<Object> {
    return this.calendarEventsService.going(id, userID);
  }

  @Delete(':id/going/:userID')
  @UseGuards(AuthorizationGuard, RolesGuard, new UserSelfActionGuard('userID'))
  @Roles(ROLES.USER, ROLES.ADMIN)
  removeGoing(
    @Param('id') id: string,
    @Param('userID') userID: string,
  ): Promise<Object> {
    return this.calendarEventsService.going(id, userID, true);
  }

  @Get(':id/going')
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles(ROLES.USER, ROLES.ADMIN)
  getGoingCollection(@Param('id') id: string): Promise<Array<Going>> {
    return this.calendarEventsService.getGoing(id);
  }

  @Get(':id/going/:userID')
  @UseGuards(AuthorizationGuard, RolesGuard, new UserSelfActionGuard('userID'))
  @Roles(ROLES.USER, ROLES.ADMIN)
  isGoing(
    @Param('id') id: string,
    @Param('userID') userID: string,
  ): Promise<boolean> {
    return this.calendarEventsService.isGoing(id, userID);
  }
}
