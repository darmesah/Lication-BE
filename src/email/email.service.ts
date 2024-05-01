import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import * as hbs from 'handlebars';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
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

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context?: any,
  ): Promise<void> {
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

  async sendSignupToken(email: string, token: string): Promise<void> {
    const subject = `Your Email Verification Code is ...`;
    const template = 'signupToken';
    const context = { token };
    await this.sendMail(email, subject, template, context);
  }

  async sendpasswordResetToken(
    email: string,
    firstName: string,
    token: string,
  ): Promise<void> {
    const subject = `Your Password Reset Code...`;
    const template = 'passwordResetToken';
    const context = { firstName, token };
    await this.sendMail(email, subject, template, context);
  }
}
