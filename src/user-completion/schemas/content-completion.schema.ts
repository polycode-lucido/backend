import { Completable } from '../models/completable.interface';

export enum ContentType {
  EXERCISE = 'exercise',
  LESSON = 'lesson',
  MODULE = 'module',
  COURSE = 'course',
}

export abstract class ContentCompletion implements Completable {
  abstract type: ContentType;
  abstract isCompleted(): boolean;
  abstract progressRate(): number;
}

export type ContentDocument = ContentCompletion & Document;
