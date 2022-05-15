import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { InvalidArgumentError, NotFoundError, UnknownError } from 'src/errors';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './entities/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

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
      return await this.courseModel.findById(id).exec();
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
