import { DatabaseObject } from 'apps/api/src/services/database/models/database-object.entity';

export class TrackLike extends DatabaseObject {
  trackID: string;
  trackTitle: string;
  userID: string;
  username: string;

  constructor() {
    super();
    this.trackID = '';
    this.trackTitle = '';
    this.userID = '';
    this.username = '';
  }
}
