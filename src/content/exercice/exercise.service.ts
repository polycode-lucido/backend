import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'src/errors';
import { CourseService } from '../course/course.service';
import { mongoErrorWrapper } from '../models/error.handler';
import { ModuleService } from '../module/module.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise, ExerciseDocument } from './entities/exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
    private readonly moduleService: ModuleService,
    private readonly courseService: CourseService,
  ) {}

  async create(createExerciceDto: CreateExerciseDto): Promise<Exercise> {
    return await mongoErrorWrapper(async () => {
      const { parentCourse, parentModule } = createExerciceDto;
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

      const createExercice = new this.exerciseModel(createExerciceDto);
      await createExercice.save();

      if (parentCourse) {
        await this.courseService.addExercises(parent, [createExercice]);
      }
      if (parentModule) {
        await this.moduleService.addExercises(parent, [createExercice]);
      }

      return createExercice;
    });
  }

  async findAll(): Promise<Exercise[]> {
    return mongoErrorWrapper(
      async () => await this.exerciseModel.find().exec(),
    );
  }

  async findOne(id: string) {
    return mongoErrorWrapper(
      async () => await this.exerciseModel.findById(id).exec(),
    );
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return mongoErrorWrapper(async () => {
      const newExercise = await this.exerciseModel
        .findByIdAndUpdate(id, updateExerciseDto, { new: true })
        .exec();
      if (!newExercise) {
        throw new NotFoundError('Exercise not found');
      }
      return newExercise;
    });
  }

  async remove(id: string) {
    return mongoErrorWrapper(async () => {
      const exercise = await this.exerciseModel.findById(id).exec();
      if (!exercise) {
        throw new NotFoundError('Exercise not found');
      }

      const { parentCourse, parentModule } = exercise;

      if (parentCourse && (parentCourse as any)._id) {
        const parent = await this.courseService.findOne(
          (parentCourse as any)._id,
        );
        await this.courseService.removeExercise(parent, exercise);
      }

      if (parentModule && (parentModule as any)._id) {
        const parent = await this.courseService.findOne(
          (parentModule as any)._id,
        );
        await this.courseService.removeExercise(parent, exercise);
      }

      return await this.exerciseModel.findByIdAndDelete(id).exec();
    });
  }
}
