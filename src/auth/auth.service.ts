import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/database/dto/user/login-user.dto';
import { User } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Configurations } from 'src/Configuration';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(dataObj: LoginUserDto): Promise<boolean> {
    const userObj: User = await this.userRepository
      .createQueryBuilder('u')
      .select()
      .where('u.email=:uemail', { uemail: dataObj.email })
      .getOne();
    if (!userObj) {
      throw new ConflictException('Invalid credentials');
    }
    const encryptedPassword: string =
      typeof userObj.password === 'string' ? userObj.password : '';
    const inputPassword: string =
      typeof dataObj.password === 'string' ? dataObj.password : '';
    const compareObj: any = await bcrypt.compare(
      inputPassword,
      encryptedPassword,
    );
    if (!compareObj) {
      throw new ConflictException('Invalid credentials');
    }

    return true;
  }

  async login(dataObj: LoginUserDto) {
    const userObj: User = await this.userRepository
      .createQueryBuilder('u')
      .where('u.email=:uemail', { uemail: dataObj.email })
      .getOne();
    if (!userObj) {
      throw new ConflictException('Invalid user');
    }
    const payload: any = { name: userObj.name, sub: userObj.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserFromToken(tokenStr: string) {
    try {
      const tokens: string[] = tokenStr.split(' ');
      const token: string = typeof tokens[1] === 'string' ? tokens[1] : '';
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

      throw new UnauthorizedException('Hi');

      return userObj;
    } catch (errorObj: any) {
      const message: string =
        errorObj && typeof errorObj.message === 'string'
          ? errorObj.message
          : 'Invalid request';
      throw new UnauthorizedException(message);
    }
  }
}
