import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../routes/users/services/users.service';
import { getUserIDFromToken } from './token.helpers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const routeRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!routeRoles) {
      return true;
    }

    const userID = getUserIDFromToken(context);

    // get user roles
    const user = await this.usersService.getOne(userID);
    if (!user) throw new ForbiddenException('User not found.');
    const userRoles: Array<string> = [user.type];

    // check that user has at least one of the route roles
    const hasRole = () =>
      routeRoles.some((routeRole) => userRoles?.includes(routeRole));

    return hasRole();
  }
}
