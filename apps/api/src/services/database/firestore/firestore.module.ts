import { Module, DynamicModule, Global, Type } from '@nestjs/common';
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

  static forFeature(collectionName: string): DynamicModule {
    return {
      module: FirestoreModule,
      providers: [
        {
          provide: collectionName,
          useFactory: (options: Settings) =>
            new FirestoreService(options, collectionName),
          inject: [FIRESTORE_OPTIONS],
        },
      ],
      exports: [collectionName],
    };
  }
}
