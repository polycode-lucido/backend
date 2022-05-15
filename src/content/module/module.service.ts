import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { InvalidArgumentError, NotFoundError, UnknownError } from 'src/errors';
import { ExerciseDocument } from '../exercice/entities/exercise.schema';
import { LessonDocument } from '../lesson/entities/lesson.schema';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module, ModuleDocument } from './entities/module.schema';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
  ) {}

  async addExercises(module: ModuleDocument, exercises: ExerciseDocument[]) {
    module.exercises.push(...exercises);
    return await module.save();
  }

  async addLessons(module: ModuleDocument, lessons: LessonDocument[]) {
    module.lessons.push(...lessons);
    return await module.save();
  }

  async removeExercise(module: ModuleDocument, exercise: ExerciseDocument) {
    return await this.moduleModel.findByIdAndUpdate(exercise.parentModule, {
      $pull: { exercises: exercise._id },
    });
  }

  async removeLesson(lesson: LessonDocument) {
    return await this.moduleModel.findByIdAndUpdate(lesson.parentModule, {
      $pull: { lessons: lesson._id },
    });
  }

  async setParent() {
    throw new UnknownError('Method not implemented.');
  }

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    try {
      const createModule = new this.moduleModel(createModuleDto);
      return await createModule.save();
    } catch (error) {
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async findAll(): Promise<Module[]> {
    try {
      return await this.moduleModel.find().exec();
    } catch (error) {
      throw new UnknownError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.moduleModel.findById(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Module with id ${id} not found`);
      } else if (error instanceof Error.CastError) {
        throw new InvalidArgumentError(`Module id ${id}`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    try {
      return await this.moduleModel
        .findByIdAndUpdate(id, updateModuleDto)
        .exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Module with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.moduleModel.findByIdAndDelete(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Module with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }
}
