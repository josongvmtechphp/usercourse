import {
  Body,
  Controller,
  Post,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local.auth.guard';
import { LoginUserDto } from '../structures/dto/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (errorObj: any) {
      const message: string =
        errorObj && typeof errorObj.message === 'string'
          ? errorObj.message
          : 'Server error';
      throw new ConflictException(message);
    }
  }
}
