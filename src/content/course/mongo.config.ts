import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MONGO_HOST: Joi.string().default('mongodb://localhost:37655/polycode'),
  MONGO_USER: Joi.string().default('user'),
  MONGO_PASSWORD: Joi.string().default('password'),
});

export const registerer = registerAs('mongo', () => {
  console.log({
    uri: process.env['MONGO_HOST'],
    user: process.env['MONGO_USER'],
    pass: process.env['MONGO_PASSWORD'],
  });
  return {
    uri: process.env['MONGO_HOST'],
    user: process.env['MONGO_USER'],
    pass: process.env['MONGO_PASSWORD'],
  };
});
