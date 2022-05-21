import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { CourseService } from 'src/content/course/course.service';
import { Exercise } from 'src/content/exercise/entities/exercise.schema';
import { ExerciseService } from 'src/content/exercise/exercise.service';
import { mongoErrorWrapper } from 'src/content/models/error.handler';
import { ModuleService } from 'src/content/module/module.service';
import { EntityService } from 'src/entity/entity.service';
import { NotFoundError } from 'src/errors';
import { CreateCourseCompletionDto } from './dto/create-course-completion.dto';
import { UpdateCourseCompletionDto } from './dto/update-course-completion.dto';
import {
  CourseCompletion,
  CourseCompletionDocument,
} from './entities/course-completion.schema';
import { ExerciseCompletionDocument } from './entities/exercise-completion.schema';

@Injectable()
export class CourseCompletionService {
  constructor(
    @InjectModel(CourseCompletion.name)
    private courseCompletionModel: Model<CourseCompletion>,
    private readonly moduleService: ModuleService,
    private readonly courseService: CourseService,
    private readonly entityService: EntityService,
    private readonly exerciseService: ExerciseService,
  ) {}

  async create(
    createCourseCompletionDto: CreateCourseCompletionDto,
    userId: string,
  ) {
    return mongoErrorWrapper(async () => {
      const coursePromise = this.courseService.findOne(
        createCourseCompletionDto.courseId,
      );

      const entityPromise = this.entityService.findById(userId);

      const [course] = await Promise.all([coursePromise, entityPromise]);

      const courseCompletion = await this.courseCompletionModel.create({
        course: createCourseCompletionDto.courseId,
        userId,
        ...createCourseCompletionDto,
      });

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

  async getUserCourses(userId: string) {
    return mongoErrorWrapper(async () => {
      const courseCompletions = await this.courseCompletionModel
        .find({ userId })
        .exec();
      return courseCompletions;
    });
  }

  async getCourseCompletionByCourseId(userId: string, courseId: string) {
    return mongoErrorWrapper(async () => {
      const courseCompletion = await this.courseCompletionModel
        .find({
          userId,
          course: courseId,
        })
        .exec();

      return courseCompletion;
    });
  }

  async findOne(courseCompletionId: string): Promise<
    Document<unknown, any, CourseCompletion> &
      CourseCompletion & {
        _id: Types.ObjectId;
      }
  > {
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

  // Should use graphlookup aggregate, but i don't have time to implement it
  async findExerciseCompletion(
    courseCompletionId: string,
    exerciseId: string,
  ): Promise<{
    exerciseCompletion: ExerciseCompletionDocument;
    courseCompletion: CourseCompletionDocument;
    exercise: Exercise;
  }> {
    return mongoErrorWrapper(async () => {
      const exercise = await this.exerciseService.findOne(exerciseId);
      const courseCompletion = await this.findOne(courseCompletionId);

      return {
        exerciseCompletion: courseCompletion.children.reduce(
          (previous, child) => {
            return previous || this.findExerciseInChildren(child, exerciseId);
          },
          undefined,
        ),
        courseCompletion,
        exercise,
      };
    });
  }

  private findExerciseInChildren = (child, exerciseId: string) => {
    if (!child || child.type == 'lesson') {
      return undefined;
    } else if (
      child.type === 'exercise' &&
      (child as any).exercise._id == exerciseId
    ) {
      return child;
    } else if (child.type === 'module') {
      return child.children.reduce((previous, child) => {
        return previous || this.findExerciseInChildren(child, exerciseId);
      }, undefined);
    }
  };
}
