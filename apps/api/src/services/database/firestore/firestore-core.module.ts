import { Settings } from '@google-cloud/firestore';
import { DynamicModule, Global, Module } from '@nestjs/common';

export const FIRESTORE_OPTIONS = 'FIRESTORE_OPTIONS';

@Global()
@Module({})
export class FirestoreCoreModule {
  static forRoot(options: Settings): DynamicModule {
    return {
      module: FirestoreCoreModule,
      providers: [
        {
          provide: FIRESTORE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [FIRESTORE_OPTIONS],
    };
  }
}
