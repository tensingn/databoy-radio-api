import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DateService } from '../../services/date/date.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { CalendarEventType } from './entities/calendar-event-type.entity';
import { CalendarEvent } from './entities/calendar-event.entity';

@Injectable()
export class CalendarEventsService {
  constructor(private dateService: DateService) {}

  findAll(daysAgo: number) {
    if (daysAgo == null) {
      //   return this.calendarEventRepository.find({
      //     relations: ['calendarEventType'],
      //     order: {
      //       startTime: 'ASC',
      //     },
      //   });
      // } else {
      //   let date: Date = this.dateService.daysAgoNoTime(daysAgo);
      //   return this.calendarEventRepository.find({
      //     relations: ['calendarEventType'],
      //     where: {
      //       startTime: MoreThanOrEqual(date),
      //     },
      //     order: {
      //       startTime: 'ASC',
      //     },
      //   });
    }
  }

  async findOne(calendarEventId: number) {
    // let calendarEvent = await this.calendarEventRepository.findOne(
    //   calendarEventId,
    //   {
    //     relations: ['calendarEventType'],
    //   },
    // );
    // if (!calendarEvent) {
    //   throw new HttpException(
    //     'Calendar event not found.',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    // return calendarEvent;
  }

  async createCalendarEvent(body: CreateCalendarEventDto): Promise<number> {
    // let calendarEventType = await this.calendarEventTypeRepository.findOne(
    //   body.calendarEventTypeId,
    // );

    // if (!calendarEventType) {
    //   throw new HttpException(
    //     'CalendarEventType with this Id does not exist.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // let calendarEvent = this.calendarEventRepository.create({
    //   calendarEventType,
    //   ...body,
    // });

    // let createdCalendarEvent = await this.calendarEventRepository.save(
    //   calendarEvent,
    // );

    // if (createdCalendarEvent) {
    //   return createdCalendarEvent.calendarEventId;
    // } else {
    //   throw new HttpException(
    //     'Error creating calendar event.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
    return 1;
  }
}
