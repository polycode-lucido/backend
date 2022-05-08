import { Injectable } from '@nestjs/common';
import { SesEmailOptions, SesService } from '@nextnm/nestjs-ses';
import { EmailProvider } from '../email.model';

@Injectable()
export class AWSSesService implements EmailProvider {
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
}
