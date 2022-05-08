import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { Dialect } from 'sequelize/types';

export const validationSchema = Joi.object({
  DATABASE_DIALECT: Joi.string()
    .valid('mysql', 'postgres', 'sqlite', 'mssql', 'mariadb')
    .default('postgres'),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().default('postgres'),
  DATABASE_PASSWORD: Joi.string().default('postgres'),
  DATABASE_DB: Joi.string().default('postgres'),
});

export const registerer = registerAs('database', () => {
  return {
    dialect: process.env['DATABASE_DIALECT'] as Dialect,
    host: process.env['DATABASE_HOST'],
    port: parseInt(process.env['DATABASE_PORT']),
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'] || '',
    database: process.env['DATABASE_DB'],
    autoLoadModels: true,
    synchronize: true,
    logQueryParameters: true,
  };
});
