import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCertificateDTO {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  stateOfOrigin: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  lgaOfOrigin: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  lga: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  dateOfIssue: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  dateOfExpiry: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  placeOfIssue: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  purposeOfTravel: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  destinationCountry: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  durationOfStay: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  addressInDestination: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  currentOccupation: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  employerName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  employerAddress: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  preferredAppointmentTime: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  nearestCaptureCenter: string;
}
