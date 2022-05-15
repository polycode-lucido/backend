import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { InvalidArgumentError, NotFoundError, UnknownError } from 'src/errors';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise, ExerciseDocument } from './entities/exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}

  async create(createExerciceDto: CreateExerciseDto): Promise<Exercise> {
    try {
      const createExercice = new this.exerciseModel(createExerciceDto);
      return await createExercice.save();
    } catch (error) {
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async findAll(): Promise<Exercise[]> {
    try {
      return await this.exerciseModel.find().exec();
    } catch (error) {
      throw new UnknownError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.exerciseModel.findById(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Exercise with id ${id} not found`);
      } else if (error instanceof Error.CastError) {
        throw new InvalidArgumentError(`Invalid id ${id}`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    try {
      return await this.exerciseModel
        .findByIdAndUpdate(id, updateExerciseDto)
        .exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Exercise with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.exerciseModel.findByIdAndDelete(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Exercise with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }
}
