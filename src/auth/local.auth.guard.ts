import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { UserCheckDto } from '../structures/dto/user.check.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (
        !(
          context &&
          context.switchToHttp &&
          context.switchToHttp().getRequest &&
          context.switchToHttp().getRequest().body &&
          typeof context.switchToHttp().getRequest().body.email === 'string' &&
          typeof context.switchToHttp().getRequest().body.password === 'string'
        )
      ) {
        return false;
      }
      const loginDto: UserCheckDto = context.switchToHttp().getRequest().body;
      const userObj: any = await this.authService.validateUser(loginDto);
      if (!userObj) {
        return false;
      }

      return true;
    } catch (error: any) {
      const message: string =
        error && typeof error.message === 'string'
          ? error.message
          : 'Invalid request';
      throw new UnauthorizedException(message);
    }
  }
}
