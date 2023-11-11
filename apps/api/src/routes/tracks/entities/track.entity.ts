import { DatabaseObject } from 'apps/api/src/services/database/models/database-object.entity';

export class Track extends DatabaseObject {
  title: string;
  src: string;
  release: string;
  likes: number;

  constructor() {
    super();
    this.title = '';
    this.src = '';
    this.release = '';
    this.likes = 0;
  }
}
