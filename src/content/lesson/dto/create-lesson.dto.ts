import { OmitType } from '@nestjs/mapped-types';
import { Allow } from 'class-validator';
import { EitherParentCourseOrParentModule } from 'src/content/models/createDto.validator';
import { Lesson } from '../entities/lesson.schema';

export class CreateLessonDto extends OmitType(Lesson, [
  'parentCourse',
  'parentModule',
]) {
  @EitherParentCourseOrParentModule({
    message: 'Either parentCourse or parentModule must be defined, not both',
  })
  @Allow()
  parentCourse?: string;
  @Allow()
  parentModule?: string;
}
