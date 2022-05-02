import { Inject, Injectable } from '@nestjs/common';
import { EmailProvider } from './email.module';

@Injectable()
export class EmailService {
  private mailProvider: EmailProvider;

  constructor(
    @Inject('EmailProviderService') emailProviderService: EmailProvider,
  ) {
    this.mailProvider = emailProviderService;
  }

  async sendVerificationEmail(email: string, firstname, token: string) {
    this.mailProvider.sendMail(
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
          <p><a href="http://localhost:3001/emailverification?token=${token}">Verify</a></p>
        </body>
      </html>
    `,
    );
  }

  async sendPasswordResetEmail(email: string, firstname, token: string) {
    this.mailProvider.sendMail(
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
          <p><a href="http://localhost:3001/changepassword?token=${token}">Change password</a></p>
        </body>
      </html>
    `,
    );
  }
}
