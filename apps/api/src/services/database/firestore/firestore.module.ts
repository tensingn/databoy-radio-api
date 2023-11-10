import { Module, DynamicModule, Global, Type } from '@nestjs/common';
import { Settings } from '@google-cloud/firestore';
import { FirestoreService } from './firestore.service';
import {
  FIRESTORE_OPTIONS,
  FirestoreCoreModule,
} from './firestore-core.module';
import { DatabaseObject } from '../models/database-object.entity';

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
          provide: type.name,
          useFactory: (options: Settings) =>
            new FirestoreService(options, type),
          inject: [FIRESTORE_OPTIONS],
        },
      ],
      exports: [type.name],
    };
  }
}
