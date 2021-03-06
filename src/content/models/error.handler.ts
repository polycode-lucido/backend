import { Error } from 'mongoose';
import {
  ConflictError,
  CustomError,
  InvalidArgumentError,
  NotFoundError,
  UnknownError,
} from 'src/errors';
import { MongoServerError } from 'mongodb';

export function mongoErrorHandler(error: Error) {
  if (error instanceof Error.CastError) {
    throw new InvalidArgumentError(
      `Invalid field : ${error.path} ( ${error.value} )`,
    );
  } else if (error instanceof Error.ValidationError) {
    let message = '';
    for (const key in error.errors) {
      message += `Invalid field ${key} : ${error.errors[key].value}\n`;
    }
    throw new InvalidArgumentError(message);
  } else if (error instanceof Error.DocumentNotFoundError) {
    throw new NotFoundError(`Not found : `);
  } else if (error instanceof MongoServerError) {
    throw new ConflictError(`Conflict`);
  } else if (error instanceof CustomError) {
    throw error;
  } else {
    throw new UnknownError(error.stack);
  }
}

export async function mongoErrorWrapper(handler: () => any) {
  try {
    return await handler();
  } catch (error) {
    mongoErrorHandler(error);
  }
}
