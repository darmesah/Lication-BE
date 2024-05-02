import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ScheduleBiometricAppointmentDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  preferredAppointmentTime: string;
}
