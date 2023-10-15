import {
  CollectionReference,
  DocumentSnapshot,
  Firestore,
  OrderByDirection,
  Query,
  Settings,
  WhereFilterOp,
} from '@google-cloud/firestore';
import { Inject, Injectable, Type } from '@nestjs/common';
import { FIRESTORE_OPTIONS } from './firestore.module';

@Injectable()
export class FirestoreService {
  private readonly db: Firestore;
  private readonly USERS: string = 'users';

  constructor(@Inject(FIRESTORE_OPTIONS) private options: Settings) {
    this.db = new Firestore(this.options);
  }

  async getCollection<T extends Object, TField = string>(
    options: QueryOptions<TField>,
    type: Type,
  ): Promise<Array<T>> {
    const values = await this.getCollectionFromDB<T, TField>(
      this.USERS,
      options,
    );

    const returnArray = new Array();
    values.forEach((value) => {
      returnArray.push(Object.assign(new type.prototype.constructor(), value));
    });
    return returnArray;
  }

  async getSingle<T>(id: string, type: Type): Promise<T> {
    const value = this.getSingleFromDB<T>(this.USERS, id);

    return Object.assign(new type.prototype.constructor(), value);
  }

  private async getCollectionFromDB<T, TField = string>(
    collectionName: string,
    options: QueryOptions<TField> = null,
  ): Promise<Array<T>> {
    const ref = await this.assembleQuery<TField>(collectionName, options);

    const docs = (await ref.get()).docs;
    const values = docs.map((doc) => doc.data() as T);

    return values;
  }

  private async getSingleFromDB<T>(
    collectionName: string,
    id: string,
  ): Promise<T> {
    return (await this.getDocumentSnapshot(collectionName, id)).data() as T;
  }

  private async getDocumentSnapshot(
    collectionName: string,
    id: string,
  ): Promise<DocumentSnapshot> {
    const docRef = this.db.collection(collectionName).doc(id);
    return docRef.get();
  }

  private async assembleQuery<TField = string>(
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
    } else if (options.pagingOptions) {
      const pagingOptions = options.pagingOptions;

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

export type QueryOptions<TField = string> = {
  whereOptions?: WhereOptions<TField>;
  orderOptions?: OrderOptions<TField>;
  pagingOptions?: PagingOptions<TField>;
};

export type WhereOptions<TField = string> = {
  key: string;
  value: TField;
  operation: WhereFilterOp;
  pagingOptions: PagingOptions<string>;
};

export type OrderOptions<TField = string> = {
  field: string;
  direction: OrderByDirection;
  pagingOptions: PagingOptions<TField>;
};

export type PagingOptions<T = string> = {
  startAfter: T;
  limit: number;
};
