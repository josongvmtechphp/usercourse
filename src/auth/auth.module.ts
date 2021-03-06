import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import { User } from '../database/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [LocalAuthGuard, AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
