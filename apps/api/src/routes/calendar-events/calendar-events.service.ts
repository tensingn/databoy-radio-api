import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';

@Injectable()
export class CalendarEventsService {
  constructor(
    @InjectRepository(CalendarEvent)
    private calendarEventRepository: Repository<CalendarEvent>,
  ) {}

  findAll() {
    return this.calendarEventRepository.find({
      relations: ['calendarEventType'],
    });
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
