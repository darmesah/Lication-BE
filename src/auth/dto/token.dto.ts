import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class TokenDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  token: string;
}
