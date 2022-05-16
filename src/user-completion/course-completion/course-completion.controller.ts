import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseCompletionService } from './course-completion.service';
import { CreateCourseCompletionDto } from './dto/create-course-completion.dto';
import { UpdateCourseCompletionDto } from './dto/update-course-completion.dto';

@Controller('course-completion')
export class CourseCompletionController {
  constructor(private readonly courseCompletionService: CourseCompletionService) {}

  @Post()
  create(@Body() createCourseCompletionDto: CreateCourseCompletionDto) {
    return this.courseCompletionService.create(createCourseCompletionDto);
  }

  @Get()
  findAll() {
    return this.courseCompletionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseCompletionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseCompletionDto: UpdateCourseCompletionDto) {
    return this.courseCompletionService.update(+id, updateCourseCompletionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseCompletionService.remove(+id);
  }
}
