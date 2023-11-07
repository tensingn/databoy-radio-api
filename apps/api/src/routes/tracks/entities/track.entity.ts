import { DatabaseObject } from 'apps/api/src/services/database/models/database-object.entity';

export class Track extends DatabaseObject {
  static collectionName: string = 'tracks';
  title: string;
  src: string;

  constructor() {
    super();
    this.title = '';
    this.src = '';
  }
}
