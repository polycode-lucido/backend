import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  ACCESS_PRIVATE_KEY: Joi.string().required(),
  ACCESS_PUBLIC_KEY: Joi.string().required(),
});

export const registerer = registerAs('auth', () => {
  return {
    refreshPublicKey: process.env['REFRESH_PUBLIC_KEY'],
    accessPublicKey: process.env['ACCESS_PUBLIC_KEY'],
  };
});
