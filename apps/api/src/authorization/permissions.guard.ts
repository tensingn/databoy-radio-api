import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!routePermissions) {
      return true;
    }

    const m2mPermissions = context.getArgs()[0].auth.scope?.split(' ');

    const hasRole = () =>
      routePermissions.every((routePermission) =>
        m2mPermissions?.includes(routePermission),
      );

    return hasRole();
  }
}
