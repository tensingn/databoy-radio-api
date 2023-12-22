import { SetMetadata } from '@nestjs/common';

export const Permissions = (...args: string[]) =>
  SetMetadata('permissions', args);

export const USER_PERMISSIONS = {
  CREATE_USER: 'create:user',
  READ_USER: 'read:user',
  UPDATE_USER: 'update:user',
  DELETE_USER: 'delete:user',
};

export const RELEASE_PERMISSIONS = {
  CREATE_RELEASE: 'create:release',
  READ_RELEASE: 'read:release',
  UPDATE_RELEASE: 'update:release',
  DELETE_RELEASE: 'delete:release',
};
