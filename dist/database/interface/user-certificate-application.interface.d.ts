/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
export interface IUserCertificateApplication extends Document {
    userId: string;
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
    preferredAppointmentTime: string;
    nearestCaptureCenter: string;
}
