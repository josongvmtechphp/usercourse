import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { User } from '../database/entity/user.entity';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Course } from '../database/entity/couse.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [CourseController],
  imports: [TypeOrmModule.forFeature([User, Course])],
  providers: [CourseService, JwtAuthGuard, JwtService, AuthService],
})
export class CourseModule {}
