import { DatabaseObject } from 'apps/api/src/services/database/models/database-object.entity';

export class User extends DatabaseObject {
  username: string;
  email: string;
  type: 'user' | 'admin';

  constructor() {
    super();
    this.username = '';
    this.email = '';
    this.type = 'user';
  }
}
