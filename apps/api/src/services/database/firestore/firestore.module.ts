import { Module, DynamicModule, Global } from '@nestjs/common';
import { Settings } from '@google-cloud/firestore';
import { FirestoreService } from './firestore.service';

export const FIRESTORE_OPTIONS = 'FIRESTORE_OPTIONS';

@Global()
@Module({})
export class FirestoreModule {
  static register(options: Settings): DynamicModule {
    return {
      module: FirestoreModule,
      providers: [
        {
          provide: FIRESTORE_OPTIONS,
          useValue: options,
        },
        FirestoreService,
      ],
      exports: [FirestoreService],
    };
  }
}
