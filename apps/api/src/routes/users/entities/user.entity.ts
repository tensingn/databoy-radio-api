import { DatabaseObject } from 'apps/api/src/services/database/models/database-object.entity';

export class User extends DatabaseObject {
  userID: string;
  username: string;
  email: string;
  type: 'user' | 'admin';
}
