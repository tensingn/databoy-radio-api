import { Module, DynamicModule, Type } from '@nestjs/common';
import { Settings } from '@google-cloud/firestore';
import { FirestoreService } from './firestore.service';
import {
  FIRESTORE_OPTIONS,
  FirestoreCoreModule,
} from './firestore-core.module';

@Module({})
export class FirestoreModule {
  static forRoot(options: Settings): DynamicModule {
    return {
      module: FirestoreModule,
      imports: [FirestoreCoreModule.forRoot(options)],
    };
  }

  static forFeature(type: Type): DynamicModule {
    return {
      module: FirestoreModule,
      providers: [
        {
          provide: type.name.toLocaleLowerCase(),
          useFactory: (options: Settings) =>
            new FirestoreService(
              options,
              [type],
              type.name.toLocaleLowerCase(),
            ),
          inject: [FIRESTORE_OPTIONS],
        },
      ],
      exports: [type.name.toLocaleLowerCase()],
    };
  }

  static forFeatures(
    types: Array<Type>,
    collectionName: string,
  ): DynamicModule {
    return {
      module: FirestoreModule,
      providers: [
        {
          provide: collectionName,
          useFactory: (options: Settings) =>
            new FirestoreService(options, types, collectionName),
          inject: [FIRESTORE_OPTIONS],
        },
      ],
      exports: [collectionName],
    };
  }
}
