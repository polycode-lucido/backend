import { PickType } from '@nestjs/mapped-types';
import { IsDefined } from 'class-validator';
import { CourseCompletion } from '../entities/course-completion.schema';

export class CreateCourseCompletionDto {
  @IsDefined()
  courseId: string;
}
