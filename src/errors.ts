import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

export abstract class CustomError extends Error {}
export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class InvalidArgumentError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidArgumentError';
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class UnknownError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownError';
  }
}

export function HTTPErrorHandler(error: Error) {
  if (error instanceof ConflictError) {
    throw new HttpException(error.message, HttpStatus.CONFLICT);
  } else if (error instanceof NotFoundError) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof InvalidArgumentError) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  } else if (error instanceof ForbiddenError) {
    throw new HttpException(error.message, HttpStatus.FORBIDDEN);
  } else {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export function HTTPErrorWrapper(handler: () => void) {
  try {
    handler();
  } catch (error) {
    HTTPErrorHandler(error);
  }
}

@Catch(CustomError)
export class HTTPErrorFilter extends BaseExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    let test = null;
    if (error instanceof ConflictError) {
      test = new HttpException(error.message, HttpStatus.CONFLICT);
    } else if (error instanceof NotFoundError) {
      test = new HttpException(error.message, HttpStatus.NOT_FOUND);
    } else if (error instanceof InvalidArgumentError) {
      test = new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } else if (error instanceof ForbiddenError) {
      test = new HttpException(error.message, HttpStatus.FORBIDDEN);
    } else {
      test = new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    Logger.error(
      error?.stack ? error.message : 'No message',
      'ExceptionFilter',
    );

    super.catch(test, host);
  }
}
