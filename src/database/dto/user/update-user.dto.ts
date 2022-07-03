import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(20)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(40)
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(40)
  password: string;
}
