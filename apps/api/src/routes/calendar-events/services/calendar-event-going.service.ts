import { Injectable } from '@nestjs/common';
import { InjectCollectionByType } from 'apps/api/src/services/database/firestore/firestore.decorators';
import {
  FirestoreService,
  QueryOptions,
  WhereClause,
} from 'apps/api/src/services/database/firestore/firestore.service';
import { Going } from '../entities/going.entity';
import { GoingDto } from '../dto/going-dto';
import { AlreadyExistsException } from 'apps/api/src/exceptions/already-exists.exception';
import { NotFoundException } from 'apps/api/src/exceptions/not-found.exception';

@Injectable()
export class CalendarEventGoingService {
  constructor(
    @InjectCollectionByType(Going) private firestoreService: FirestoreService,
  ) {}

  async create(goingDto: GoingDto): Promise<Going> {
    if (await this.isGoing(goingDto.calendarEventID, goingDto.userID)) {
      throw new AlreadyExistsException(
        Going,
        `User ${goingDto.userID} is already going to Calendar Event ${goingDto.calendarEventID}`,
      );
    }

    return this.firestoreService.addSingle<Going>(
      Object.assign(new Going(), goingDto),
    );
  }

  async delete(goingDto: GoingDto): Promise<void> {
    // using getCollection because we don't have an ID yet.
    // also, there shouldn't be more than 1 going for each user/calendar event pair,
    // but this deletes all if there does happen to be more than 1.
    const goings = await this.getCollection(
      CalendarEventGoingService.getQueryOptions(
        goingDto.calendarEventID,
        goingDto.userID,
      ),
    );

    if (!goings || goings.length < 1) {
      throw new NotFoundException(
        Going,
        `User ${goingDto.userID} is not already going to Calendar Event ${goingDto.calendarEventID}`,
      );
    }

    const deletePromises = [];
    goings.forEach((g) =>
      deletePromises.push(this.firestoreService.deleteSingle(g.id)),
    );

    await Promise.all(deletePromises);
  }

  async isGoing(calendarEventID: string, userID: string): Promise<boolean> {
    return (
      (
        await this.getCollection(
          CalendarEventGoingService.getQueryOptions(calendarEventID, userID),
        )
      ).length > 0
    );
  }

  getCollection(query: QueryOptions): Promise<Array<Going>> {
    return this.firestoreService.getCollection(query);
  }

  static getQueryOptions(
    calendarEventID: string,
    userID: string,
    limit: number = 10,
    startAfter: string = null,
  ): QueryOptions {
    const whereClauses = new Array<WhereClause>();

    if (calendarEventID) {
      whereClauses.push({
        field: 'calendarEventID',
        operation: '==',
        value: calendarEventID,
      });
    }

    if (userID) {
      whereClauses.push({
        field: 'userID',
        operation: '==',
        value: userID,
      });
    }

    if (whereClauses.length < 1) {
      // TODO - define error
      throw new Error('Must specify a calendarEventID or userID.');
    }

    return {
      whereOptions: {
        pagingOptions: {
          limit,
          startAfter,
        },
        whereClauses,
      },
    };
  }
}
