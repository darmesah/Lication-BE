import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCertificateDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  middleName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  stateOfOrigin: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lgaOfOrigin: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lga: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  dateOfIssue: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  dateOfExpiry: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  placeOfIssue: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  purposeOfTravel: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  destinationCountry: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  durationOfStay: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  addressInDestination: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  currentOccupation: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  employerName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  employerAddress: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  nearestCaptureCenter: string;
}
