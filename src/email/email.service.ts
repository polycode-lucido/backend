import { Injectable } from '@nestjs/common';
import { SesEmailOptions, SesService } from '@nextnm/nestjs-ses';

@Injectable()
export class EmailService {
  constructor(private readonly sesService: SesService) {}

  async sendMail(to: string, subject: string, text: string) {
    const emailOptions: SesEmailOptions = {
      to,
      from: 'accounts@simonlucido.com',
      subject,
      html: text,
    };
    this.sesService.sendEmail(emailOptions);
  }

  async sendVerificationEmail(email: string, firstname, token: string) {
    this.sendMail(
      email,
      'Verify your account',
      `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Email Link</title>
          <meta charset="UTF-8">
      </head>
      <body>
          <p>Hi ${firstname},</p>
          <p>Please verify your account by clicking on the following link:</p>
          <p><a href="http://localhost:3000/verifyemail?token=${token}">Verify</a></p>
        </body>
      </html>
    `,
    );
  }

  async sendPasswordResetEmail(email: string, firstname, token: string) {
    this.sendMail(
      email,
      'Reset your password',
      `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Email Link</title>
          <meta charset="UTF-8">
      </head>
      <body>
          <p>Hi ${firstname},</p>
          <p>Please change your password by clicking on the following link:</p>
          <p><a href="http://localhost:3000/changepassword?token=${token}">Change password</a></p>
        </body>
      </html>
    `,
    );
  }
}
