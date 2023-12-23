import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt as jwt, GetVerificationKey } from 'express-jwt';
import 'dotenv/config';
import { IncomingMessage } from 'http';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string = process.env.AUTH0_AUDIENCE;
  private AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: IncomingMessage = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJwt(req as any, res);
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
