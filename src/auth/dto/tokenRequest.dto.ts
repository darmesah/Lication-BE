import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class TokenRequestDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  email: string;
}
