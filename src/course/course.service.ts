import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { Course } from 'src/database/entity/couse.entity';
import { CreateCourseDto } from 'src/database/dto/course/create-course.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private authService: AuthService,
  ) {}
  async getCourses() {
    return await this.courseRepository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.user', 'u')
      .where('c.isActive=:ciscctive', { ciscctive: 1 })
      .getMany();
  }

  async createCourse(dataObj: {
    createCourseDto: CreateCourseDto;
    auth: string;
  }) {
    const userObj: User = await this.authService.getUserFromToken(dataObj.auth);
  }
}
