import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Type,
} from '@nestjs/common';
import { CreateCalendarEventDto } from '../dto/create-calendar-event.dto';
import { CalendarEvent } from '../entities/calendar-event.entity';
import {
  FirestoreService,
  QueryOptions,
  STANDARD,
  WhereClause,
} from 'apps/api/src/services/database/firestore/firestore.service';
import { InjectCollectionByCollectionName } from 'apps/api/src/services/database/firestore/firestore.decorators';
import {
  getDateBeginningOfDay,
  getDateDaysInFuture,
  getDateEndOfDay,
  getToday,
} from 'apps/api/src/utils/date/date.utils';
import { Timestamp } from '@google-cloud/firestore';
import { GetCalendarEventDto } from '../dto/get-calendar-event.dto';
import { UpdateCalendarEventDto } from '../dto/update-calendar-event.dto';
import { Dictionary } from 'apps/api/src/services/database/models/dictionary';
import { ReleaseEvent } from '../entities/release-event.entity';
import { LiveEvent } from '../entities/live-event.entity';
import { StreamEvent } from '../entities/stream-event.entity';
import { NotFoundException } from 'apps/api/src/exceptions/not-found.exception';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { CalendarEventGoingService } from './calendar-event-going.service';
import { Going } from '../entities/going.entity';
import { GoingDto } from '../dto/going-dto';

@Injectable()
export class CalendarEventsService {
  private types: Dictionary<Type> = {
    release: ReleaseEvent,
    live: LiveEvent,
    stream: StreamEvent,
  };

  constructor(
    @InjectCollectionByCollectionName(CalendarEvent.collectionName)
    private firestoreService: FirestoreService,
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(CalendarEventGoingService)
    private calendarEventGoingService: CalendarEventGoingService,
  ) {}

  async getCollection(
    startOfRange: Date = getDateBeginningOfDay(getToday()),
    endOfRange: Date = getDateEndOfDay(getDateDaysInFuture(30)),
  ): Promise<Array<GetCalendarEventDto>> {
    return (
      await this.firestoreService.getCollection<CalendarEvent, Timestamp>(
        CalendarEventsService.queryEventsInRange(
          Timestamp.fromDate(startOfRange),
          Timestamp.fromDate(endOfRange),
        ),
      )
    ).map((e) => this.convertEntityToGetDto(e));
  }

  async findOne(id: string): Promise<GetCalendarEventDto> {
    const calendarEvent = await this.firestoreService.getSingle<CalendarEvent>(
      id,
    );

    if (!calendarEvent) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return this.convertEntityToGetDto(calendarEvent);
  }

  async create(
    createCalendarEventDto: CreateCalendarEventDto,
  ): Promise<GetCalendarEventDto> {
    return this.convertEntityToGetDto(
      await this.firestoreService.addSingle<CalendarEvent>(
        this.convertCreateDtoToEntity(createCalendarEventDto),
      ),
    );
  }

  async update(
    id: string,
    updateCalendarEventDto: UpdateCalendarEventDto,
  ): Promise<Object> {
    const calendarEvent = await this.findOne(id);

    if (!calendarEvent) {
      throw new NotFoundException(CalendarEvent);
    }

    const returnObj = {
      id,
      ...(await this.firestoreService.updateSingle(
        id,
        Object.assign(updateCalendarEventDto, {
          type: calendarEvent.type,
        }),
      )),
    };

    return returnObj;
  }

  async going(
    calendarEventID: string,
    userID: string,
    remove: boolean = false,
  ): Promise<Object> {
    const [calendarEvent, user] = await Promise.all([
      this.firestoreService.getSingle<CalendarEvent>(calendarEventID),
      this.usersService.getOne(userID),
    ]);

    if (!calendarEvent) {
      throw new NotFoundException(CalendarEvent);
    }

    if (!user) {
      throw new NotFoundException(User);
    }

    // add/delete going
    const going: GoingDto = Object.assign(new GoingDto(), {
      calendarEventID,
      calendarEventTitle: calendarEvent.title,
      calendarEventType: calendarEvent.type,
      userID,
      username: user.username,
    });
    if (remove) {
      await this.calendarEventGoingService.delete(going);
    } else {
      await this.calendarEventGoingService.create(going);
    }

    // add/remove like to/from release
    const updateCalendarEventDto: UpdateCalendarEventDto = {
      numGoing: (calendarEvent.numGoing || 0) + (remove ? -1 : 1),
      type: calendarEvent.type,
    };
    const updatedCalendarEvent = (await this.update(
      calendarEventID,
      updateCalendarEventDto,
    )) as CalendarEvent;

    return updateCalendarEventDto
      ? {
          id: calendarEventID,
          numGoing: updatedCalendarEvent.numGoing,
        }
      : null;
  }

  getGoing(id: string): Promise<Array<Going>> {
    return this.calendarEventGoingService.getCollection(
      CalendarEventGoingService.getQueryOptions(id, null),
    );
  }

  static queryEventsInRange(
    startOfRange: Timestamp = Timestamp.now(),
    endOfRange: Timestamp = null,
  ): QueryOptions<Timestamp> {
    const whereClauses: Array<WhereClause<Timestamp>> = [
      {
        field: 'startTimestamp',
        operation: '>=',
        value: startOfRange,
      },
    ];

    if (endOfRange) {
      whereClauses.push({
        field: 'startTimestamp',
        operation: '<=',
        value: endOfRange,
      });
    }
    return {
      whereOptions: {
        whereClauses,
        operator: 'and',
        pagingOptions: STANDARD.pagingOptions,
      },
    };
  }

  private convertEntityToGetDto(entity: CalendarEvent): GetCalendarEventDto {
    const { startTimestamp, endTimestamp, ...entityNoTimestamps } = entity;
    return {
      startTime: entity.startTimestamp.toDate(),
      endTime: entity.endTimestamp.toDate(),
      ...entityNoTimestamps,
    };
  }

  private convertCreateDtoToEntity(dto: CreateCalendarEventDto): CalendarEvent {
    const { startTime, endTime, ...dtoNoTimes } = dto;
    return {
      id: '',
      startTimestamp: Timestamp.fromDate(startTime),
      endTimestamp: Timestamp.fromDate(endTime),
      ...dtoNoTimes,
    };
  }
}
