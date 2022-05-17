import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HTTPErrorFilter } from 'src/errors';
import { CourseCompletionService } from './course-completion.service';
import { CreateCourseCompletionDto } from './dto/create-course-completion.dto';
import { UpdateCourseCompletionDto } from './dto/update-course-completion.dto';

@UseFilters(HTTPErrorFilter)
@Controller('course-completion')
export class CourseCompletionController {
  constructor(
    private readonly courseCompletionService: CourseCompletionService,
  ) {}

  @Post()
  async create(@Body() createCourseCompletionDto: CreateCourseCompletionDto) {
    return await this.courseCompletionService.create(createCourseCompletionDto);
  }

  @Get()
  async findAll() {
    return this.courseCompletionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseCompletionService.findOne(id);
  }

  @Get(':id/progress-rate')
  async progressRate(@Param('id') id: string) {
    return this.courseCompletionService.progressRate(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseCompletionDto: UpdateCourseCompletionDto,
  ) {
    return this.courseCompletionService.update(+id, updateCourseCompletionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseCompletionService.remove(+id);
  }
}
