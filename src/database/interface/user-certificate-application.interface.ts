import { Document } from 'mongoose';

export interface IUserCertificateApplication extends Document {
  userId: string;
  idNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  lga: string;
  passportNumber: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  placeOfIssue: string;
  purposeOfTravel: string;
  destinationCountry: string;
  durationOfStay: string;
  addressInDestination: string;
  currentOccupation: string;
  employerName: string;
  employerAddress: string;
  position: string;
  nearestCaptureCenter: string;
  preferredAppointmentTime: string;
  paymentStatus: 'not-paid' | 'paid';
}
