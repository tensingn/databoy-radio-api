import {
  CollectionReference,
  DocumentReference,
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
import { Doc } from 'prettier';

@Injectable()
export class FirestoreService {
  private readonly db: Firestore;
  private readonly USERS: string = 'users';

  constructor(@Inject(FIRESTORE_OPTIONS) private options: Settings) {
    this.db = new Firestore(this.options);
  }

  async getUsers(): Promise<Array<User>> {
    const users = await this.getCollection<User, string>(this.USERS, {
      // whereOptions: {
      //   key: 'type',
      //   value: 'admin',
      //   operation: '==',
      //   pagingOptions: {
      //     startAfter: '',
      //     limit: 1,
      //   },
      // },
      orderOptions: {
        field: 'username',
        direction: 'asc',
        pagingOptions: {
          startAfter: 'khari',
          limit: 2,
        },
      },
    });

    return users;
  }

  private async getSingle<T>(collectionName: string, id: string): Promise<T> {
    return (await this.getDocumentSnapshot(collectionName, id)).data() as T;
  }

  private async getDocumentSnapshot(
    collectionName: string,
    id: string,
  ): Promise<DocumentSnapshot> {
    const docRef = this.db.collection(collectionName).doc(id);
    return docRef.get();
  }

  private async getCollection<T, TField>(
    collectionName: string,
    options: QueryOptions<TField> = null,
  ): Promise<Array<T>> {
    const ref = await this.assembleQuery(collectionName, options);

    const docs = (await ref.get()).docs;
    const values = docs.map((doc) => doc.data() as T);

    return values;
  }

  private async assembleQuery<TField>(
    collectionName: string,
    options: QueryOptions<TField>,
  ): Promise<CollectionReference | Query> {
    if (options?.whereOptions && options.orderOptions) {
      throw new Error(
        "Can't use WhereOptions and OrderOptions in the same query.",
      );
    }

    let ref: CollectionReference | Query = this.db.collection(collectionName);

    if (options?.whereOptions) {
      const whereOptions = options.whereOptions;
      const pagingOptions = whereOptions.pagingOptions;

      if (!pagingOptions) throw new Error('PagingOptions are required.');

      const last = pagingOptions.startAfter
        ? await this.getDocumentSnapshot(
            collectionName,
            pagingOptions.startAfter,
          )
        : null;

      ref = ref.where(
        whereOptions.key,
        whereOptions.operation,
        whereOptions.value,
      );

      if (last) {
        ref = ref.startAfter(last);
      }

      ref = ref.limit(pagingOptions.limit);
    } else if (options?.orderOptions) {
      const orderOptions = options.orderOptions;
      const pagingOptions = orderOptions.pagingOptions;

      if (!pagingOptions) {
        throw new Error('PagingOptions are required.');
      }

      ref = ref.orderBy(orderOptions.field, orderOptions.direction);

      if (pagingOptions.startAfter) {
        ref = ref.startAfter(pagingOptions.startAfter);
      }

      ref = ref.limit(pagingOptions.limit);
    } else {
      ref = ref.orderBy('id', 'asc').limit(10);
    }

    return ref;
  }
}

type QueryOptions<TField> = {
  whereOptions?: WhereOptions<TField>;
  orderOptions?: OrderOptions<TField>;
};

type WhereOptions<TField> = {
  key: string;
  value: TField;
  operation: WhereFilterOp;
  pagingOptions: PagingOptions<string>;
};

type OrderOptions<TField> = {
  field: string;
  direction: OrderByDirection;
  pagingOptions: PagingOptions<TField>;
};

type PagingOptions<T> = {
  startAfter: T;
  limit: number;
};
