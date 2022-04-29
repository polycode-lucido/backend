import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidArgumentError';
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class UnknownError extends Error {
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
