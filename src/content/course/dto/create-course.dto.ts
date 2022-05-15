import { OmitType } from '@nestjs/mapped-types';
import { Course } from '../entities/course.schema';

export class CreateCourseDto extends OmitType(Course, [
  'exercises',
  'lessons',
]) {}
