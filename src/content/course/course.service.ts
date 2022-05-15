import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { InvalidArgumentError, NotFoundError, UnknownError } from 'src/errors';
import { ExerciseDocument } from '../exercice/entities/exercise.schema';
import { LessonDocument } from './../lesson/entities/lesson.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './entities/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async addExercises(course: CourseDocument, exercises: ExerciseDocument[]) {
    course.exercises.push(...exercises);
    return await course.save();
  }

  async addLessons(course: CourseDocument, lessons: LessonDocument[]) {
    course.lessons.push(...lessons);
    return await course.save();
  }

  async removeExercise(course: CourseDocument, exercise: ExerciseDocument) {
    return await this.courseModel.findByIdAndUpdate(exercise.parentCourse, {
      $pull: { exercises: exercise._id },
    });
  }

  async removeLesson(course: CourseDocument, lesson: LessonDocument) {
    return await this.courseModel.findByIdAndUpdate(lesson.parentCourse, {
      $pull: { lessons: course._id },
    });
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const createCourse = new this.courseModel(createCourseDto);
      return await createCourse.save();
    } catch (error) {
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async findAll(): Promise<Course[]> {
    try {
      return await this.courseModel.find().exec();
    } catch (error) {
      throw new UnknownError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.courseModel.findById<CourseDocument>(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Course with id ${id} not found`);
      } else if (error instanceof Error.CastError) {
        throw new InvalidArgumentError(`Invalid id ${id}`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      return await this.courseModel
        .findByIdAndUpdate(id, updateCourseDto)
        .exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Course with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.courseModel.findByIdAndDelete(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Course with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }
}
