import { AWSSesOptions } from './ses/awsses.module';

export enum EmailProviderType {
  SES = 'SES',
}
export interface EmailProvider {
  sendMail(to: string, subject: string, text: string);
}

export interface EmailOptions {
  emailProvider: EmailProviderType;
  ses: AWSSesOptions;
}

export const EMAIL_PROVIDER_SERVICE = 'EmailProviderService';
