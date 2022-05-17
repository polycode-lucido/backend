import { PartialType } from '@nestjs/swagger';
import { CreateCourseCompletionDto } from './create-course-completion.dto';

export class UpdateCourseCompletionDto extends PartialType(
  CreateCourseCompletionDto,
) {}
