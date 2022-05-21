import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('access'))
  @Post()
  async create(
    @Req() req,
    @Body() createCourseCompletionDto: CreateCourseCompletionDto,
  ) {
    return await this.courseCompletionService.create(
      createCourseCompletionDto,
      req.user,
    );
  }

  @Get()
  async findAll() {
    return this.courseCompletionService.findAll();
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return this.courseCompletionService.findOne(id);
  }

  @Get(':id/progress-rate')
  async progressRate(@Param('id') id: string) {
    return this.courseCompletionService.progressRate(id);
  }

  @Get('courseId/:id')
  @UseGuards(AuthGuard('access'))
  async getCourseCompletionByCourseId(@Req() req, @Param('id') courseId) {
    return this.courseCompletionService.getCourseCompletionByCourseId(
      req.user,
      courseId,
    );
  }

  @Get('me')
  @UseGuards(AuthGuard('access'))
  async getUserCourses(@Req() req) {
    return this.courseCompletionService.getUserCourses(req.user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseCompletionDto: UpdateCourseCompletionDto,
  ) {
    return this.courseCompletionService.update(id, updateCourseCompletionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.courseCompletionService.remove(id);
  }
}
