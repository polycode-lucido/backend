import { PickType } from '@nestjs/mapped-types';
import { IsDefined } from 'class-validator';
import { CourseCompletion } from '../entities/course-completion.schema';

export class CreateCourseCompletionDto extends PickType(CourseCompletion, [
  'userId',
]) {
  @IsDefined()
  courseId: string;
}
