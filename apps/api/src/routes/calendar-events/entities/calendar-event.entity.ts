import { Timestamp } from '@google-cloud/firestore';
import { DatabaseObjectMultiTypeContainer } from 'apps/api/src/services/database/models/database-object-multi-type-container.entity';

export class CalendarEvent extends DatabaseObjectMultiTypeContainer {
  static collectionName: string = 'event';
  title: string;
  description: string;
  longDescription: string;
  startTimestamp: Timestamp;
  endTimestamp: Timestamp;
  numGoing: number;

  constructor(type: string) {
    super(type);
    this.title = '';
    this.description = '';
    this.longDescription = '';
    this.numGoing = 0;
    this.startTimestamp = Timestamp.now();
    this.endTimestamp = Timestamp.now();
  }
}
