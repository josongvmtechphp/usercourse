import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../database/entity/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtAuthGuard, JwtService, AuthService],
})
export class UserModule {}
