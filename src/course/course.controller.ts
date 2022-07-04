import {
  Controller,
  Get,
  ConflictException,
  UseGuards,
  Post,
  Body,
  Headers,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CreateCourseDto } from '../database/dto/course/create-course.dto';
import { EditCourseDto } from '../database/dto/course/edit-course.dto';

@ApiTags('Courses')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getCourses() {
    try {
      return await this.courseService.getCourses();
    } catch (error: any) {
      const message: string =
        typeof error.message === 'string' ? error.message : 'Server error';
      throw new ConflictException(message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Headers('Authorization') auth: string,
  ) {
    try {
      await this.courseService.createCourse({ createCourseDto, auth });
      return { success: true };
    } catch (error: any) {
      const message: string =
        typeof error.message === 'string' ? error.message : 'Server error';
      throw new ConflictException(message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/:id')
  async editCourse(
    @Body() editCourseDto: EditCourseDto,
    @Headers('Authorization') auth: string,
    @Param('id') courseId: string,
  ) {
    try {
      return await this.courseService.editCourse({
        editCourseDto,
        auth,
        courseId,
      });
    } catch (error: any) {
      const message: string =
        typeof error.message === 'string' ? error.message : 'Server error';
      throw new ConflictException(message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async removeCourse(
    @Headers('Authorization') auth: string,
    @Param('id') courseId: string,
  ) {
    try {
      return await this.courseService.removeCourse({ auth, courseId });
    } catch (error: any) {
      const message: string =
        typeof error.message === 'string' ? error.message : 'Server error';
      throw new ConflictException(message);
    }
  }
}
