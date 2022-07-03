import { Controller, Get, ConflictException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

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
}
