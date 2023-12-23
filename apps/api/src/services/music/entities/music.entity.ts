import { DatabaseObjectMultiTypeContainer } from '../../database/models/database-object-multi-type-container.entity';

export class Music extends DatabaseObjectMultiTypeContainer {
  title: string;
  numLikes: number;

  constructor(type: string) {
    super(type);
    this.title = '';
    this.numLikes = 0;
  }
}
