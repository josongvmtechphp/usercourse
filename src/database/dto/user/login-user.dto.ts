import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsNotEmpty()
  @MaxLength(40)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(40)
  password: string;
}
