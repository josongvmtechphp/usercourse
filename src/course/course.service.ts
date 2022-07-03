import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { Course } from 'src/database/entity/couse.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}
  async getCourses() {
    return await this.courseRepository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.user', 'u')
      .where('c.isActive=:ciscctive', { ciscctive: 1 })
      .getMany();
  }
}
