"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const nodemailer = require("nodemailer");
const hbs = require("handlebars");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    constructor(config) {
        this.config = config;
        this.transporter = nodemailer.createTransport({
            host: this.config.get('MAIL_HOST'),
            port: 587,
            secure: false,
            auth: {
                user: this.config.get('MAIL_USER'),
                pass: this.config.get('MAIL_PASSWORD'),
            },
        });
    }
    async sendMail(to, subject, template, context) {
        const source = fs.readFileSync(`./views/${template}.handlebars`, 'utf-8');
        const compiledTemplate = hbs.compile(source);
        const html = compiledTemplate(context);
        await this.transporter.sendMail({
            from: `"Lisaprop Africa" ${this.config.get('MAIL_SENDER')}`,
            to,
            subject,
            html,
        });
    }
    async sendSignupToken(email, token) {
        const subject = `Your Email Verification Code is ...`;
        const template = 'signupToken';
        const context = { token };
        await this.sendMail(email, subject, template, context);
    }
    async sendpasswordResetToken(email, firstName, token) {
        const subject = `Your Password Reset Code...`;
        const template = 'passwordResetToken';
        const context = { firstName, token };
        await this.sendMail(email, subject, template, context);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map