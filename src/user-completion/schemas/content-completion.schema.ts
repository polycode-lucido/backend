export enum ContentType {
  EXERCISE = 'exercise',
  LESSON = 'lesson',
  MODULE = 'module',
  COURSE = 'course',
}

export abstract class ContentCompletion {
  abstract type: ContentType;
}

export type ContentDocument = ContentCompletion & Document;
