import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { InvalidArgumentError, NotFoundError, UnknownError } from 'src/errors';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson, LessonDocument } from './entities/lesson.schema';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) {}

  async create(createExerciceDto: CreateLessonDto): Promise<Lesson> {
    try {
      const createLesson = new this.lessonModel(createExerciceDto);
      return await createLesson.save();
    } catch (error) {
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async findAll(): Promise<Lesson[]> {
    try {
      return await this.lessonModel.find().exec();
    } catch (error) {
      throw new UnknownError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.lessonModel.findById(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Lesson with id ${id} not found`);
      } else if (error instanceof Error.CastError) {
        throw new InvalidArgumentError(`Invalid id ${id}`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    try {
      return await this.lessonModel
        .findByIdAndUpdate(id, updateLessonDto)
        .exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Lesson with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.lessonModel.findByIdAndDelete(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Lesson with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }
}
