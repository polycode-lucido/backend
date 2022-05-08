import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  REFRESH_PRIVATE_KEY: Joi.string().required(),
  ACCESS_PUBLIC_KEY: Joi.string().required(),
  ACCESS_PRIVATE_KEY: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION: Joi.string().default('60s'),
});

export const registerer = registerAs('token', () => {
  return {
    refreshPrivateKey: process.env['REFRESH_PRIVATE_KEY'],
    accessPrivateKey: process.env['ACCESS_PRIVATE_KEY'],
    accessPublicKey: process.env['ACCESS_PUBLIC_KEY'],
    signOptions: { expiresIn: process.env['ACCESS_TOKEN_EXPIRATION'] },
  };
});
