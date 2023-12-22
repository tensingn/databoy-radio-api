import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { getUserIDFromToken } from './token.helpers';

@Injectable()
export class UserSelfActionGuard implements CanActivate {
  constructor(private userIDParameterName: string) {}

  canActivate(context: ExecutionContext): boolean {
    if (!this.userIDParameterName) return false;

    const userID = getUserIDFromToken(context);

    // check userID in request matches userID in token
    const req = context.getArgByIndex(0);
    if (!req.params) throw new BadRequestException('No user on request.');
    const reqUserID = req.params[this.userIDParameterName];
    if (reqUserID != userID)
      throw new ForbiddenException('User on request must match user on token.');

    return true;
  }
}
