import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupDTO {
  // @ApiProperty({ required: true, example: 'owner' })
  // @IsString()
  // @IsNotEmpty()
  // @IsEnum({ OWNER: 'owner', DEVELOPER: 'developer' })
  // role: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: true, example: 'test@test.com' })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ required: true, example: '@Test1234' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({})
  password: string;
}
