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
import { DatabaseObject } from '../models/database-object.entity';
import { FIRESTORE_OPTIONS } from './firestore-core.module';

@Injectable()
export class FirestoreService {
  private readonly db: Firestore;
  private readonly collectionName: string;

  constructor(
    @Inject(FIRESTORE_OPTIONS) private options: Settings,
    private readonly type: Type,
  ) {
    this.db = new Firestore(this.options);
    this.collectionName = type.name.toLocaleLowerCase();
  }

  // public methods
  async getCollection<T extends DatabaseObject, TField = string>(
    options: QueryOptions<TField>,
  ): Promise<Array<T>> {
    const docs = await this.getCollectionFromDB<TField>(
      this.collectionName,
      options,
    );

    const returnArray = new Array<T>();
    docs.forEach((doc) => {
      const returnObj = doc.data() as T;
      returnObj.id = doc.id;
      returnArray.push(returnObj);
    });
    return returnArray;
  }

  getSingle<T>(id: string): Promise<T> {
    return this.getSingleFromDB<T>(this.collectionName, id);
  }

  async addSingle<T extends DatabaseObject>(object: T): Promise<T> {
    const { id, ...saveObject } = object;
    const res = await this.db.collection(this.collectionName).add(saveObject);

    object.id = res.id;

    return object;
  }

  async updateSingle(id: string, partialObject: Object): Promise<Object> {
    const partialObjectProps = Object.getOwnPropertyNames(partialObject);
    const saveObjectProps = Object.getOwnPropertyNames(
      new this.type.prototype.constructor(),
    );

    const saveObject = {};
    partialObjectProps.forEach((prop) => {
      if (saveObjectProps.includes(prop) && prop in partialObject) {
        saveObject[prop] = partialObject[prop];
      }
    });

    this.db.collection(this.collectionName).doc(id).update(saveObject);

    return saveObject;
  }

  async deleteSingle(id: string) {
    return this.db.collection(this.collectionName).doc(id).delete();
  }

  // private methods
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
    const doc = (
      await this.getDocumentSnapshot(collectionName, id)
    ).data() as T;
    return doc;
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
      const whereClauses = whereOptions.whereClauses;
      const pagingOptions = whereOptions.pagingOptions;

      if (!pagingOptions) throw new Error('PagingOptions are required.');

      const last = pagingOptions.startAfter
        ? await this.getDocumentSnapshot(
            collectionName,
            pagingOptions.startAfter,
          )
        : null;

      whereClauses.forEach((wc) => {
        ref = ref.where(wc.field, wc.operation, wc.value);
      });

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
  whereClauses: WhereClause<TField>[];
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

export type WhereClause<TField = string> = {
  field: string;
  value: TField;
  operation: WhereFilterOp;
};
