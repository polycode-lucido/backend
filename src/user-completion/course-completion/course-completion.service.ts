import { Injectable } from '@nestjs/common';
import { CreateCourseCompletionDto } from './dto/create-course-completion.dto';
import { UpdateCourseCompletionDto } from './dto/update-course-completion.dto';

@Injectable()
export class CourseCompletionService {
  create(createCourseCompletionDto: CreateCourseCompletionDto) {
    return 'This action adds a new courseCompletion';
  }

  findAll() {
    return `This action returns all courseCompletion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseCompletion`;
  }

  update(id: number, updateCourseCompletionDto: UpdateCourseCompletionDto) {
    return `This action updates a #${id} courseCompletion`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseCompletion`;
  }
}
