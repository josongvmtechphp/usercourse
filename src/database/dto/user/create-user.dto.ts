import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(40)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(40)
  password: string;
}
