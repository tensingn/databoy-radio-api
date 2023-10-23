import {
  CollectionReference,
  DocumentSnapshot,
  FieldPath,
  Firestore,
  OrderByDirection,
  Query,
  QueryDocumentSnapshot,
  Settings,
  WhereFilterOp,
} from '@google-cloud/firestore';
import { Inject, Injectable, Type } from '@nestjs/common';
import { FIRESTORE_OPTIONS } from './firestore.module';
import { DatabaseObject } from '../models/database-object.entity';

@Injectable()
export class FirestoreService {
  private readonly db: Firestore;
  private readonly USERS: string = 'users';

  constructor(@Inject(FIRESTORE_OPTIONS) private options: Settings) {
    this.db = new Firestore(this.options);
  }

  async getCollection<T extends DatabaseObject, TField = string>(
    options: QueryOptions<TField>,
    type: Type,
  ): Promise<Array<T>> {
    const docs = await this.getCollectionFromDB<TField>(this.USERS, options);

    const returnArray = new Array<T>();
    docs.forEach((doc) => {
      const returnObj = Object.assign(
        new type.prototype.constructor(),
        doc.data(),
      ) as T;
      returnObj.id = doc.id;
      returnArray.push(returnObj);
    });
    return returnArray;
  }

  async getSingle<T>(id: string, type: Type): Promise<T> {
    const value = this.getSingleFromDB<T>(this.USERS, id);

    return Object.assign(new type.prototype.constructor(), value);
  }

  private async getCollectionFromDB<TField = string>(
    collectionName: string,
    options: QueryOptions<TField> = null,
  ): Promise<Array<QueryDocumentSnapshot>> {
    const ref = await this.assembleQuery<TField>(collectionName, options);

    return (await ref.get()).docs;
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
        whereOptions.field,
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
      ref = ref.orderBy(FieldPath.documentId());

      if (pagingOptions.startAfter) {
        ref = ref.startAfter(pagingOptions.startAfter);
      }

      ref = ref.limit(pagingOptions.limit);
    } else {
      ref = ref.orderBy(FieldPath.documentId(), 'asc').limit(10);
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
  field: string;
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
