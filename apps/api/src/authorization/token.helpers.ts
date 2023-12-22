import { ExecutionContext, ForbiddenException } from '@nestjs/common';

export function getUserIDFromToken(context: ExecutionContext) {
  // get userID off token
  const req = context.getArgByIndex(0);
  const sub: string = req?.auth?.sub;
  if (!sub || sub.split('|')?.length < 2)
    throw new ForbiddenException('Invalid user on token.');
  const userID = sub.split('|')[1];

  return userID;
}
