import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  Put,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from '../database/dto/user/create-user.dto';
import { UpdateUserDto } from '../database/dto/user/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getUsers() {
    try {
      return await this.userService.getUsers();
    } catch (error: any) {
      const message: string =
        typeof error.message === 'string' ? error.message : 'Server error';
      throw new ConflictException(message);
    }
  }

  @ApiBearerAuth()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.addUser(createUserDto);
      return { success: true };
    } catch (error: any) {
      const message: string =
        typeof error.message === 'string' ? error.message : 'Server error';
      throw new ConflictException(message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  async editUser(
    @Body() updateUserDto: UpdateUserDto,
    @Headers('Authorization') auth: string,
  ) {
    try {
      await this.userService.updateUser({ auth, updateUserDto });
      return { success: true };
    } catch (error: any) {
      const message: string =
        typeof error.message === 'string' ? error.message : 'Server error';
      throw new ConflictException(message);
    }
  }
}
