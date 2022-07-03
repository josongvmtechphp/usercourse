import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import { User } from '../structures/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [LocalAuthGuard, AuthService],
})
export class AuthModule {}
