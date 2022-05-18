import { PickType } from '@nestjs/swagger';
import { CourseCompletion } from '../entities/course-completion.schema';

export class UpdateCourseCompletionDto extends PickType(CourseCompletion, [
  'children',
  'progressRate',
]) {}
