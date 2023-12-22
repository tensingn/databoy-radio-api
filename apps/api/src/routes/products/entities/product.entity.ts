import { Timestamp } from '@google-cloud/firestore';
import { DatabaseObject } from 'apps/api/src/services/database/models/database-object.entity';

export class Product extends DatabaseObject {
  name: string;
  pluralName: string;
  type: string;
  price: number;
  imageURLs: Array<string>;
  releaseTimestamp: Timestamp;
  sizes: Array<string>;

  constructor() {
    super();
    this.name = '';
    this.pluralName = '';
    this.type = '';
    this.price = 0;
    this.imageURLs = [];
    this.sizes = [];
    this.releaseTimestamp = Timestamp.now();
  }
}
