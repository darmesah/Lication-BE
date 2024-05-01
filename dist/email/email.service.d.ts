import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private config;
    private transporter;
    constructor(config: ConfigService);
    sendMail(to: string, subject: string, template: string, context?: any): Promise<void>;
    sendSignupToken(email: string, token: string): Promise<void>;
    sendpasswordResetToken(email: string, firstName: string, token: string): Promise<void>;
}
