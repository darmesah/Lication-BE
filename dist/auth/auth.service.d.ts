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
import { SigninDTO, SignupDTO } from './dto';
import { Model } from 'mongoose';
import { IUser } from 'src/database/interface';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwt;
    private readonly emailService;
    private userModel;
    constructor(jwt: JwtService, emailService: EmailService, userModel: Model<IUser>);
    signup(payload: SignupDTO): Promise<{
        message: string;
        accessToken: string;
    }>;
    signin(payload: SigninDTO): Promise<{
        message: string;
        accessToken: string;
    }>;
    userExists(email: string): Promise<import("mongoose").Document<unknown, {}, IUser> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signJWT(_id: string, email: string): Promise<string>;
    verifyJWT(userId: string): Promise<any>;
}
