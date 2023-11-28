import { DatabaseObject } from './database-object.entity';

export class DatabaseObjectMultiTypeContainer extends DatabaseObject {
  constructor(public type: string) {
    super();
  }
}
