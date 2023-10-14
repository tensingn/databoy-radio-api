import {
  CollectionReference,
  DocumentSnapshot,
  Firestore,
  OrderByDirection,
  Query,
  Settings,
  WhereFilterOp,
} from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { FIRESTORE_OPTIONS } from './firestore.module';
import { User } from '../../routes/users/entities/user.entity';

@Injectable()
export class FirestoreService {
  private readonly db: Firestore;
  private readonly USERS: string = 'users';

  constructor(@Inject(FIRESTORE_OPTIONS) private options: Settings) {
    this.db = new Firestore(this.options);
  }

  last: DocumentSnapshot = null;

  async getUsers(): Promise<Array<User>> {
    const { values, last } = await this.getCollection<User>(this.USERS, {
      // whereOptions: {
      //   key: 'username',
      //   value: 'khari',
      //   operation: '==',
      // },
      orderOptions: {
        field: 'username',
        direction: 'asc',
      },
      pagingOptions: {
        startAfter: this.last,
        limit: 1,
      },
    });
    this.last = last;

    return values;
  }

  private async getSingle<T>(collectionName: string, id: string): Promise<T> {
    const docRef = this.db.collection(collectionName).doc(id);
    const obj: T = (await docRef.get()).data() as T;
    return obj;
  }

  private async getCollection<T>(
    collectionName: string,
    options: QueryOptions = null,
  ): Promise<GetResponse<Array<T>>> {
    let ref: CollectionReference | Query = this.db.collection(collectionName);

    if (options?.whereOptions) {
      ref = ref.where(
        options.whereOptions.key,
        options.whereOptions.operation,
        options.whereOptions.value,
      );
    }

    if (options?.orderOptions) {
      ref = ref.orderBy(
        options.orderOptions.field,
        options.orderOptions.direction,
      );
    }

    if (options?.pagingOptions) {
      ref = ref
        .startAfter(options.pagingOptions.startAfter)
        .limit(options.pagingOptions.limit);
    } else {
      ref = ref.limit(10);
    }

    const docs = (await ref.get()).docs;
    const values = docs.map((doc) => doc.data() as T);
    const last = docs[docs.length - 1];

    return { values, last };
  }
}

type QueryOptions = {
  whereOptions?: WhereOptions;
  orderOptions?: OrderOptions;
  pagingOptions?: PagingOptions;
};

type WhereOptions = {
  key: string;
  value: any;
  operation: WhereFilterOp;
};

type OrderOptions = {
  field: string;
  direction: OrderByDirection;
};

type PagingOptions = {
  startAfter: DocumentSnapshot;
  limit: number;
};

type GetResponse<T> = {
  values: T;
  last: DocumentSnapshot;
};
