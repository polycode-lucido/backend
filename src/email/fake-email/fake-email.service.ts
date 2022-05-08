import { Injectable, Logger } from '@nestjs/common';
import { EmailProvider } from '../email.model';

@Injectable()
export class FakeEmailService implements EmailProvider {
  sendMail(to: string, subject: string, text: string) {
    Logger.debug(
      `Sending email to ${to}. Subject is ${subject}. Body is : 
    ${text}`,
      'FakeEmailService',
    );
  }
}
