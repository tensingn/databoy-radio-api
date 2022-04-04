import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { DateService } from '../../services/date/date.service';
import { CalendarEvent } from './entities/calendar-event.entity';

@Injectable()
export class CalendarEventsService {
  constructor(
    @InjectRepository(CalendarEvent)
    private calendarEventRepository: Repository<CalendarEvent>,
    private dateService: DateService,
  ) {}

  findAll(daysAgo: number) {
    if (daysAgo == null) {
      return this.calendarEventRepository.find({
        relations: ['calendarEventType'],
        order: {
          startTime: 'ASC',
        },
      });
    } else {
      let date: Date = this.dateService.daysAgoNoTime(daysAgo);
      return this.calendarEventRepository.find({
        relations: ['calendarEventType'],
        where: {
          startTime: MoreThanOrEqual(date),
        },
        order: {
          startTime: 'ASC',
        },
      });
    }
  }

  async findOne(calendarEventId: number) {
    let calendarEvent = await this.calendarEventRepository.findOne(
      calendarEventId,
      {
        relations: ['calendarEventType'],
      },
    );
    if (!calendarEvent) {
      throw new HttpException(
        'Calendar event not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    return calendarEvent;
  }
}
