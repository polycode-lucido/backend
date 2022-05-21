import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { NotFoundError } from 'src/errors';
import { ExerciseDocument } from '../exercise/entities/exercise.schema';
import { ExerciseService } from '../exercise/exercise.service';
import { LessonService } from '../lesson/lesson.service';
import { mongoErrorWrapper } from '../models/error.handler';
import { ModuleDocument } from '../module/entities/module.schema';
import { ModuleService } from '../module/module.service';
import { LessonDocument } from './../lesson/entities/lesson.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './entities/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @Inject(forwardRef(() => ExerciseService))
    private readonly exerciseService: ExerciseService,
    @Inject(forwardRef(() => LessonService))
    private readonly lessonService: LessonService,
    @Inject(forwardRef(() => ModuleService))
    private readonly moduleService: ModuleService,
  ) {}

  async addExercises(course: CourseDocument, exercises: ExerciseDocument[]) {
    course.exercises.push(...exercises);
    return await course.save();
  }

  async addLessons(course: CourseDocument, lessons: LessonDocument[]) {
    course.lessons.push(...lessons);
    return await course.save();
  }

  async addModules(course: CourseDocument, modules: ModuleDocument[]) {
    course.modules.push(...modules);
    return await course.save();
  }

  async removeExercise(course: CourseDocument, exercise: ExerciseDocument) {
    return await this.courseModel.findByIdAndUpdate(
      course._id,
      {
        $pull: { exercises: exercise._id },
      },
      { new: true },
    );
  }

  async removeLesson(course: CourseDocument, lesson: LessonDocument) {
    return await this.courseModel.findByIdAndUpdate(
      course._id,
      {
        $pull: { lessons: lesson._id },
      },
      { new: true },
    );
  }

  async removeModule(course: CourseDocument, module: ModuleDocument) {
    return await this.courseModel.findByIdAndUpdate(
      course._id,
      {
        $pull: { modules: module._id },
      },
      { new: true },
    );
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return mongoErrorWrapper(async () => {
      const createCourse = new this.courseModel(createCourseDto);
      return await createCourse.save();
    });
  }

  async findAll(): Promise<Course[]> {
    return mongoErrorWrapper(async () => {
      return await this.courseModel.find().exec();
    });
  }

  async findOne(id: string): Promise<Course & Document<any, any, any>> {
    return mongoErrorWrapper(async () => {
      const course = await this.courseModel.findById(id).exec();
      if (!course) {
        throw new NotFoundError(`Course with id ${id} not found`);
      }
      return course;
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return mongoErrorWrapper(async () => {
      const course = await this.courseModel.findByIdAndUpdate(
        id,
        updateCourseDto,
        {
          new: true,
        },
      );
      if (!course) {
        throw new NotFoundError(`Course with id ${id} not found`);
      }
      return course;
    });
  }

  async remove(id: string) {
    return mongoErrorWrapper(async () => {
      const course = await this.courseModel.findById(id).exec();
      if (!course) {
        throw new NotFoundError(`Course with id ${id} not found`);
      }

      const { exercises, lessons, modules } = course;

      const exercisesPromises = exercises.map((exercise: ExerciseDocument) => {
        this.exerciseService.destroy(exercise._id);
      });

      const lessonsPromises = lessons.map((lesson: LessonDocument) => {
        this.lessonService.destroy(lesson._id);
      });

      const modulesPromises = modules.map((module: ModuleDocument) => {
        this.moduleService.remove(module._id);
      });

      await Promise.allSettled([
        ...exercisesPromises,
        ...lessonsPromises,
        ...modulesPromises,
      ]);

      return await course.delete();
    });
  }

  async getRecommendedCourses() {
    return mongoErrorWrapper(async () => {
      return await (await this.findAll()).slice(0, 3);
    });
  }
}
