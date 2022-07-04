import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../database/dto/user/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { UpdateUserDto } from '../database/dto/user/update-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}
  async getUsers() {
    return await this.userRepository
      .createQueryBuilder('u')
      .select('u.id')
      .addSelect('u.name')
      .addSelect('u.email')
      .getMany();
  }

  async addUser(createUserDto: CreateUserDto) {
    const userObj: User = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userObj);
  }

  async updateUser(dataObj: { updateUserDto: UpdateUserDto; auth: string }) {
    const userObj: User = await this.authService.getUserFromToken(dataObj.auth);
    if (
      dataObj &&
      dataObj.updateUserDto &&
      typeof dataObj.updateUserDto.name === 'string' &&
      dataObj.updateUserDto.name.trim() !== ''
    ) {
      userObj.name = dataObj.updateUserDto.name;
    }
    if (
      dataObj &&
      dataObj.updateUserDto &&
      typeof dataObj.updateUserDto.password === 'string' &&
      dataObj.updateUserDto.password.trim() !== ''
    ) {
      userObj.password = dataObj.updateUserDto.password;
    }

    if (
      dataObj &&
      dataObj.updateUserDto &&
      typeof dataObj.updateUserDto.email === 'string' &&
      dataObj.updateUserDto.email.trim() !== ''
    ) {
      userObj.email = dataObj.updateUserDto.email;
    }

    return await this.userRepository.save(userObj);
  }
}
