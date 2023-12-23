import { DatabaseObjectMultiTypeContainer } from '../../database/models/database-object-multi-type-container.entity';

export class Like extends DatabaseObjectMultiTypeContainer {
  userID: string;
  username: string;
  likedItemID: string; // maybe include more info of liked item so we don't have to look up item every time?

  constructor(type: string) {
    super(type);
  }
}
