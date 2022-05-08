import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { EmailOptions, EmailProviderType } from '../email.model';

export const validationSchema = Joi.object({
  EMAIL_SES_SECRET: Joi.string().required(),
  EMAIL_SES_REGION: Joi.string().required(),
  EMAIL_SES_AKI: Joi.string().required(),
});

export const registerer = registerAs('awsses', (): EmailOptions => {
  return {
    emailProvider: EmailProviderType.SES,
    ses: {
      secret: process.env['EMAIL_SES_SECRET'],
      region: process.env['EMAIL_SES_REGION'],
      accessKeyId: process.env['EMAIL_SES_AKI'],
    },
  };
});
