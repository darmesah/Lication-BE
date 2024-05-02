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
import { Model } from 'mongoose';
import { IUser, IUserCertificateApplication } from 'src/database/interface';
import { CreateCertificateDTO, ScheduleBiometricAppointmentDTO } from './dto';
export declare class UserService {
    private userModel;
    private userCertificateApplicationModel;
    constructor(userModel: Model<IUser>, userCertificateApplicationModel: Model<IUserCertificateApplication>);
    createCertificateApplication(userId: string, payload: CreateCertificateDTO): Promise<{
        message: string;
        newCertificate: import("mongoose").Document<unknown, {}, IUserCertificateApplication> & IUserCertificateApplication & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getCertificateApplications(userId: string): Promise<{
        message: string;
        certificateApplications: (import("mongoose").Document<unknown, {}, IUserCertificateApplication> & IUserCertificateApplication & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getCertificateApplication(userId: string, certificateApplicationId: string): Promise<{
        message: string;
        certificateApplication: import("mongoose").Document<unknown, {}, IUserCertificateApplication> & IUserCertificateApplication & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    payForCertificateApplication(userId: string, certificateApplicationId: string): Promise<{
        message: string;
    }>;
    scheduleBiometricAppointment(userId: string, certificateApplicationId: string, payload: ScheduleBiometricAppointmentDTO): Promise<{
        message: string;
    }>;
}
