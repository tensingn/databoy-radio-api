import { Inject, Type } from '@nestjs/common';

export const InjectCollection = (entity: Type): ReturnType<typeof Inject> =>
  Inject(entity.name);
