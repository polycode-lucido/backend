import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseService } from 'src/content/course/course.service';
import { mongoErrorWrapper } from 'src/content/models/error.handler';
import { ModuleService } from 'src/content/module/module.service';
import { EntityService } from 'src/entity/entity.service';
import { NotFoundError } from 'src/errors';
import { CreateCourseCompletionDto } from './dto/create-course-completion.dto';
import { UpdateCourseCompletionDto } from './dto/update-course-completion.dto';
import { CourseCompletion } from './entities/course-completion.schema';

@Injectable()
export class CourseCompletionService {
  constructor(
    @InjectModel(CourseCompletion.name)
    private courseCompletionModel: Model<CourseCompletion>,
    private readonly moduleService: ModuleService,
    private readonly courseService: CourseService,
    private readonly entityService: EntityService,
  ) {}

  async create(createCourseCompletionDto: CreateCourseCompletionDto) {
    return mongoErrorWrapper(async () => {
      const coursePromise = this.courseService.findOne(
        createCourseCompletionDto.courseId,
      );

      const entityPromise = await this.entityService.findById(
        createCourseCompletionDto.userId,
      );

      const [course] = await Promise.all([coursePromise, entityPromise]);

      const courseCompletion = await this.courseCompletionModel.create(
        createCourseCompletionDto,
      );

      CourseCompletion.populateChildren(
        courseCompletion,
        course.exercises,
        course.lessons,
        course.modules,
      );

      return await courseCompletion.save();
    });
  }

  async findAll() {
    return mongoErrorWrapper(async () => {
      return await this.courseCompletionModel.find().exec();
    });
  }

  async progressRate(courseCompletionId: string) {
    return mongoErrorWrapper(async () => {
      const courseCompletion = await this.courseCompletionModel
        .findById(courseCompletionId)
        .exec();

      if (!courseCompletion) {
        throw new NotFoundError('CourseCompletion not found');
      }

      return courseCompletion.progressRate;
    });
  }

  async findOne(courseCompletionId: string) {
    return mongoErrorWrapper(async () => {
      const courseCompletion = await this.courseCompletionModel
        .findById(courseCompletionId)
        .exec();

      if (!courseCompletion) {
        throw new NotFoundError('CourseCompletion not found');
      }

      return courseCompletion;
    });
  }

  async update(
    id: string,
    updateCourseCompletionDto: UpdateCourseCompletionDto,
  ) {
    return mongoErrorWrapper(async () => {
      const courseCompletion =
        await this.courseCompletionModel.findByIdAndUpdate(
          id,
          updateCourseCompletionDto,
          {
            new: true,
          },
        );
      if (!courseCompletion) {
        throw new NotFoundError('CourseCompletion not found');
      }
      return await courseCompletion.save();
    });
  }

  async remove(id: string) {
    return mongoErrorWrapper(async () => {
      const courseCompletion =
        await this.courseCompletionModel.findByIdAndDelete(id);
      if (!courseCompletion) {
        throw new NotFoundError('CourseCompletion not found');
      }
      return courseCompletion;
    });
  }
}
