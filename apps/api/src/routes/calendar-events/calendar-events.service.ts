import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { DateService } from '../../services/date/date.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { CreateCalendarEventSubscriptionDto } from './dto/create-calendar-event-subscriber';
import { CalendarEventType } from './entities/calendar-event-type.entity';
import { CalendarEvent } from './entities/calendar-event.entity';
import { CalendarEventMapperService } from './services/calendar-event-mapper.service';
import { SubscribersService } from '../subscribers/subscribers.service';
import { CalendarEventSubscription } from './entities/calendar-event-subscription.entity';

@Injectable()
export class CalendarEventsService {
  constructor(
    @InjectRepository(CalendarEvent)
    private calendarEventRepository: Repository<CalendarEvent>,
    @InjectRepository(CalendarEventType)
    private calendarEventTypeRepository: Repository<CalendarEventType>,
    @InjectRepository(CalendarEventSubscription)
    private calendarEventSubscriptionRepository: Repository<CalendarEventSubscription>,
    private dateService: DateService,
    private calendarEventMapper: CalendarEventMapperService,
    private subscribersService: SubscribersService,
  ) {}

  async findAll(daysAgo: number) {
    if (daysAgo == null) {
      return this.calendarEventMapper.calendarEventsToGetCalendarEventDtos(
        await this.calendarEventRepository.find({
          relations: [
            'calendarEventType',
            'location',
            'calendarEventSubscriptions',
          ],
          order: {
            startTime: 'ASC',
          },
        }),
      );
    } else {
      let date: Date = this.dateService.daysAgoNoTime(daysAgo);

      this.calendarEventRepository.count();
      return this.calendarEventMapper.calendarEventsToGetCalendarEventDtos(
        await this.calendarEventRepository.find({
          relations: [
            'calendarEventType',
            'location',
            'calendarEventSubscriptions',
          ],
          where: {
            startTime: MoreThanOrEqual(date),
          },
          order: {
            startTime: 'ASC',
          },
        }),
      );
    }
  }

  async findOne(calendarEventId: number) {
    let calendarEvent =
      this.calendarEventMapper.calendarEventToGetCalendarEventDto(
        await this._findOne(calendarEventId),
      );

    return calendarEvent;
  }

  async createCalendarEvent(body: CreateCalendarEventDto) {
    let calendarEventType = await this.calendarEventTypeRepository.findOne(
      body.calendarEventTypeId,
    );

    if (!calendarEventType) {
      throw new HttpException(
        'CalendarEventType with this Id does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let calendarEvent = this.calendarEventRepository.create({
      calendarEventType,
      ...body,
    });

    if (await this.calendarEventRepository.save(calendarEvent)) {
      return;
    } else {
      throw new HttpException(
        'Error creating calendar event.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCalendarEventSubscription(
    calendarEventId: number,
    body: CreateCalendarEventSubscriptionDto,
  ) {
    let calendarEvent = await this._findOne(calendarEventId);
    let subscriber = await this.subscribersService.findOne(body.subscriberId);

    // check if subscription is already created
    let subscription = await this._findCalendarEventSubscription(
      calendarEvent,
      subscriber.subscriberId,
    );
    if (subscription?.isGoing === body.isGoing) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    // this is the subscription we are saving.
    // if subscription already exists, we just want to update
    // the existing subscription.
    // otherwise, create new subscription
    let calendarEventSubscription = subscription
      ? { ...subscription, isGoing: body.isGoing }
      : this.calendarEventSubscriptionRepository.create({
          calendarEvent: calendarEvent,
          subscriber: subscriber,
          isGoing: body.isGoing,
        });
    if (
      await this.calendarEventSubscriptionRepository.save(
        calendarEventSubscription,
      )
    ) {
      return;
    } else {
      throw new HttpException(
        'Error creating calendar event subscription.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findCalendarEventSubscription(
    calendarEventId: number,
    subscriberId: number,
  ) {
    let calendarEvent = await this._findOne(calendarEventId);
    let subscriber = await this.subscribersService.findOne(subscriberId);
    if (!subscriber) {
      throw new HttpException('Subscriber not found', HttpStatus.NOT_FOUND);
    }

    let subscription = await this._findCalendarEventSubscription(
      calendarEvent,
      subscriberId,
    );

    if (!subscription) {
      throw new HttpException(
        'Subscriber not subscribed to Calendar Event',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.calendarEventMapper.calendarEventSubscriptionToCalendarEventSubscriptionDto(
      subscription,
    );
  }

  private async _findOne(calendarEventId: number) {
    let calendarEvent = await this.calendarEventRepository.findOne(
      calendarEventId,
      {
        relations: [
          'calendarEventType',
          'location',
          'calendarEventSubscriptions',
          'calendarEventSubscriptions.subscriber',
        ],
      },
    );
    if (!calendarEvent) {
      throw new HttpException('Calendar Event not found', HttpStatus.NOT_FOUND);
    }

    return calendarEvent;
  }

  private async _findCalendarEventSubscription(
    calendarEvent: CalendarEvent,
    subscriberId: number,
  ) {
    return calendarEvent.calendarEventSubscriptions.find(
      (calendarEventSubscription) =>
        calendarEventSubscription.subscriber.subscriberId === subscriberId,
    );
  }
}
