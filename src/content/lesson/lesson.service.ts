import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'src/errors';
import { CourseService } from '../course/course.service';
import { mongoErrorWrapper } from '../models/error.handler';
import { ModuleService } from '../module/module.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson, LessonDocument } from './entities/lesson.schema';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    @Inject(forwardRef(() => ModuleService))
    private readonly moduleService: ModuleService,
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return await mongoErrorWrapper(async () => {
      const { parentCourse, parentModule } = createLessonDto;
      let parent;
      if (parentCourse) {
        parent = await this.courseService.findOne(parentCourse);
        if (!parent) {
          throw new NotFoundError('Course not found');
        }
      }

      if (parentModule) {
        parent = await this.moduleService.findOne(parentModule);
        if (!parent) {
          throw new NotFoundError('Module not found');
        }
      }

      const createLesson = new this.lessonModel(createLessonDto);
      await createLesson.save();

      if (parentCourse) {
        await this.courseService.addLessons(parent, [createLesson]);
      }
      if (parentModule) {
        await this.moduleService.addLessons(parent, [createLesson]);
      }

      return createLesson;
    });
  }

  async findAll(): Promise<Lesson[]> {
    return mongoErrorWrapper(async () => await this.lessonModel.find().exec());
  }

  async findOne(id: string) {
    return mongoErrorWrapper(async () => {
      const lesson = await this.lessonModel.findById(id).exec();
      if (!lesson) {
        throw new NotFoundError(`Lesson with id ${id} not found`);
      }
      return lesson;
    });
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    return mongoErrorWrapper(async () => {
      const newLesson = await this.lessonModel
        .findByIdAndUpdate(id, updateLessonDto, { new: true })
        .exec();
      if (!newLesson) {
        throw new NotFoundError('Lesson not found');
      }
      return newLesson;
    });
  }

  async remove(id: string) {
    return mongoErrorWrapper(async () => {
      const lesson = await this.lessonModel.findById(id).exec();
      if (!lesson) {
        throw new NotFoundError('Lesson not found');
      }

      const { parentCourse, parentModule } = lesson;

      if (parentCourse && (parentCourse as any)._id) {
        const parent = await this.courseService.findOne(
          (parentCourse as any)._id,
        );
        await this.courseService.removeLesson(parent, lesson);
      }

      if (parentModule && (parentModule as any)._id) {
        const parent = await this.courseService.findOne(
          (parentModule as any)._id,
        );
        await this.courseService.removeLesson(parent, lesson);
      }

      return await this.lessonModel.findByIdAndDelete(id).exec();
    });
  }

  async destroy(id: string) {
    return mongoErrorWrapper(async () => {
      this.lessonModel.findByIdAndDelete(id).exec();
    });
  }
}
