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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@UseFilters(HTTPErrorFilter)
@Controller('course')
export class CourseController {
  constructor(private readonly coursesService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll() {
    return this.coursesService.findAll();
  }

  @Get('/id/:id')
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Get('/recommended')
  async getRecommendedCourses() {
    return this.coursesService.getRecommendedCourses();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
