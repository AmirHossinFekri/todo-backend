import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    // if (request.params.id) {
    //   const todo = await this.TODOS.findOne({
    //     where: { id: parseInt(request.params.id) },
    //     relations: { user: true },
    //   });
    //   if (!todo) {
    //     throw new UnauthorizedException();
    //   }
    //   if (todo.user.id !== request['user'].sub) {
    //     throw new UnauthorizedException();
    //   }
    // TODO}
    console.log(request);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'sUP4iRpAhlTp8vdpGlxfLcxR1vfk65yX',
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
