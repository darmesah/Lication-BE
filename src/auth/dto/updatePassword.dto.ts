import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty({ required: true, example: '@Test1234' })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
