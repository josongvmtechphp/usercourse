import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Configurations } from 'src/Configuration';
import { Repository } from 'typeorm';
import { User } from '../database/entity/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (
        !(
          context &&
          context.switchToHttp &&
          context.switchToHttp().getRequest &&
          context.switchToHttp().getRequest().headers &&
          typeof context.switchToHttp().getRequest().headers.authorization ===
            'string'
        )
      ) {
        return false;
      }
      const authStr: string = context
        .switchToHttp()
        .getRequest()
        .headers.authorization.split(' ');
      const token: string = typeof authStr[1] === 'string' ? authStr[1] : '';
      const checkObj: any = await this.jwtService.verify(token, {
        secret: Configurations.secret,
      });
      const userId: number =
        checkObj && !Number.isNaN(parseInt(checkObj.sub))
          ? parseInt(checkObj.sub)
          : 0;
      const userObj: User = await this.userRepository
        .createQueryBuilder('u')
        .where('u.id=:uid', { uid: userId })
        .getOne();
      if (!userObj) {
        throw new UnauthorizedException('Invalid token');
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
