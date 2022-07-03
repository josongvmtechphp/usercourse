import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from '../structures/dto/create-user.dto';
import { UpdateUserDto } from '../structures/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
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
  @Put('/:id')
  async editUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') userId: number,
  ) {
    try {
      await this.userService.updateUser({ userId, updateUserDto });
      return { success: true };
    } catch (error: any) {
      const message: string =
        typeof error.message === 'string' ? error.message : 'Server error';
      throw new ConflictException(message);
    }
  }
}
