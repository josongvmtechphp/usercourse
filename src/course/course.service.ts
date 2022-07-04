import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { Course } from '../database/entity/couse.entity';
import { CreateCourseDto } from '../database/dto/course/create-course.dto';
import { AuthService } from '../auth/auth.service';
import { EditCourseDto } from '../database/dto/course/edit-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private authService: AuthService,
  ) {}
  async getCourses() {
    return await this.courseRepository
      .createQueryBuilder('c')
      .select('c.id')
      .addSelect('c.title')
      .addSelect('c.description')
      .addSelect('c.url')
      .addSelect('u.id')
      .addSelect('u.name')
      .addSelect('u.email')
      .innerJoin('c.user', 'u')
      .where('c.isActive=:ciscctive', { ciscctive: 1 })
      .orderBy('c.id', 'DESC')
      .getMany();
  }

  async createCourse(dataObj: {
    createCourseDto: CreateCourseDto;
    auth: string;
  }) {
    const userObj: User = await this.authService.getUserFromToken(dataObj.auth);
    const courseObj: Course = this.courseRepository.create(
      dataObj.createCourseDto,
    );
    courseObj.user = userObj;
    return await this.courseRepository.save(courseObj);
  }

  async editCourse(dataObj: {
    editCourseDto: EditCourseDto;
    auth: string;
    courseId: string;
  }) {
    const userObj: User = await this.authService.getUserFromToken(dataObj.auth);
    const courseObj: Course = await this.courseRepository
      .createQueryBuilder('c')
      .where('c.id=:cid AND c.isActive=:cactive', {
        cid: dataObj.courseId,
        cactive: 1,
      })
      .innerJoinAndSelect('c.user', 'u')
      .getOne();
    if (!courseObj) {
      throw new ConflictException('Invalid course');
    }

    if (!(courseObj.user && userObj.id === courseObj.user.id)) {
      throw new ConflictException('Login user can not edit this course');
    }

    if (
      dataObj &&
      dataObj.editCourseDto &&
      typeof dataObj.editCourseDto.title === 'string' &&
      dataObj.editCourseDto.title.trim() !== ''
    ) {
      courseObj.title = dataObj.editCourseDto.title;
    }

    if (
      dataObj &&
      dataObj.editCourseDto &&
      typeof dataObj.editCourseDto.description === 'string' &&
      dataObj.editCourseDto.description.trim() !== ''
    ) {
      courseObj.description = dataObj.editCourseDto.description;
    }

    if (
      dataObj &&
      dataObj.editCourseDto &&
      typeof dataObj.editCourseDto.url === 'string' &&
      dataObj.editCourseDto.url.trim() !== ''
    ) {
      courseObj.url = dataObj.editCourseDto.url;
    }

    await this.courseRepository.save(courseObj);

    return { success: true };
  }

  async removeCourse(dataObj: { auth: string; courseId: string }) {
    const userObj: User = await this.authService.getUserFromToken(dataObj.auth);
    const courseObj: Course = await this.courseRepository
      .createQueryBuilder('c')
      .where('c.id=:cid AND c.isActive=:cactive', {
        cid: dataObj.courseId,
        cactive: 1,
      })
      .innerJoinAndSelect('c.user', 'u')
      .getOne();
    if (!courseObj) {
      throw new ConflictException('Invalid course');
    }

    if (!(courseObj.user && userObj.id === courseObj.user.id)) {
      throw new ConflictException('Login user can not delete this course');
    }

    courseObj.isActive = 0;
    await this.courseRepository.save(courseObj);

    return { success: true };
  }
}
