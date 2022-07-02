import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../structures/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../structures/entity/user.entity';
import { UpdateUserDto } from '../structures/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async updateUser(dataObj: { updateUserDto: UpdateUserDto; userId: number }) {
    const userObj: User = await this.userRepository
      .createQueryBuilder('u')
      .where('u.id=:userid', { userid: dataObj.userId })
      .getOne();
    if (!userObj) {
      throw new ConflictException('No users');
    }
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
