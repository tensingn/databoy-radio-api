import { DatabaseObject } from 'apps/api/src/services/database/models/database-object.entity';

export class Track extends DatabaseObject {
  title: string;
  src: string;
  release: string;

  constructor() {
    super();
    this.title = '';
    this.src = '';
    this.release = '';
  }
}
