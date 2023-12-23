import { DatabaseObject } from 'apps/api/src/services/database/models/database-object.entity';

export class Going extends DatabaseObject {
  calendarEventID: string;
  userID: string;
}
