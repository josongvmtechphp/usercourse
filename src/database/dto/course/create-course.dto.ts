import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsUrl } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(700)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  @MaxLength(300)
  url: string;
}
