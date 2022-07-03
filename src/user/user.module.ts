import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../database/entity/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtAuthGuard, JwtService],
})
export class UserModule {}
