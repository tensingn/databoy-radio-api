import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { DateService } from '../../services/date/date.service';
import { DateEvent } from './entities/date-event.entity';

@Injectable()
export class DateEventsService {
  constructor(
    @InjectRepository(DateEvent)
    private dateEventRepository: Repository<DateEvent>,
    private dateService: DateService,
  ) {}

  findAll(daysAgo: number) {
    if (!daysAgo) daysAgo = 0;
    let date: Date = this.dateService.daysAgoNoTime(daysAgo);

    return this.dateEventRepository.find({
      relations: ['calendarEvents'],
      where: {
        date: MoreThanOrEqual(date),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dateEvent`;
  }
}
