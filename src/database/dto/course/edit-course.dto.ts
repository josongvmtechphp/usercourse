import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength, IsUrl } from 'class-validator';

export class EditCourseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(700)
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(300)
  url: string;
}
