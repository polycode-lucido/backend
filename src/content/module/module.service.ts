import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError, UnknownError } from 'src/errors';
import { CourseService } from '../course/course.service';
import { ExerciseDocument } from '../exercise/entities/exercise.schema';
import { ExerciseService } from '../exercise/exercise.service';
import { LessonDocument } from '../lesson/entities/lesson.schema';
import { LessonService } from '../lesson/lesson.service';
import { mongoErrorWrapper } from '../models/error.handler';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module, ModuleDocument } from './entities/module.schema';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
    @Inject(forwardRef(() => ExerciseService))
    private readonly exerciseService: ExerciseService,
    @Inject(forwardRef(() => LessonService))
    private readonly lessonService: LessonService,
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService,
  ) {}

  async addExercises(module: ModuleDocument, exercises: ExerciseDocument[]) {
    module.exercises.push(...exercises);
    return await module.save();
  }

  async addLessons(module: ModuleDocument, lessons: LessonDocument[]) {
    module.lessons.push(...lessons);
    return await module.save();
  }

  async addModules(module: ModuleDocument, modules: ModuleDocument[]) {
    module.modules.push(...modules);
    return await module.save();
  }

  async removeExercise(module: ModuleDocument, exercise: ExerciseDocument) {
    return await this.moduleModel.findByIdAndUpdate(
      module._id,
      {
        $pull: { exercises: exercise._id },
      },
      { new: true },
    );
  }

  async removeLesson(module: ModuleDocument, lesson: LessonDocument) {
    return await this.moduleModel.findByIdAndUpdate(
      module._id,
      {
        $pull: { lessons: lesson._id },
      },
      { new: true },
    );
  }
  async removeModule(
    parentModule: ModuleDocument,
    childModule: ModuleDocument,
  ) {
    return await this.moduleModel.findByIdAndUpdate(
      parentModule.parentModule,
      {
        $pull: { modules: childModule._id },
      },
      { new: true },
    );
  }

  async setParent() {
    throw new UnknownError('Method not implemented.');
  }

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    return await mongoErrorWrapper(async () => {
      const { parentCourse, parentModule } = createModuleDto;
      let parent;
      if (parentCourse) {
        parent = await this.courseService.findOne(parentCourse);
        if (!parent) {
          throw new NotFoundError('Course not found');
        }
      }

      if (parentModule) {
        parent = await this.findOne(parentModule);
        if (!parent) {
          throw new NotFoundError('Module not found');
        }
      }

      const createModule = new this.moduleModel(createModuleDto);
      await createModule.save();

      if (parentCourse) {
        await this.courseService.addModules(parent, [createModule]);
      }
      if (parentModule) {
        await this.addModules(parent, [createModule]);
      }

      return createModule;
    });
  }

  async findAll(): Promise<Module[]> {
    return mongoErrorWrapper(async () => await this.moduleModel.find().exec());
  }

  async findOne(id: string) {
    return mongoErrorWrapper(async () => {
      const module = await this.moduleModel.findById(id).exec();
      if (!module) {
        throw new NotFoundError(`Module with id ${id} not found`);
      }
      return module;
    });
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    return mongoErrorWrapper(async () => {
      const module = await this.moduleModel.findByIdAndUpdate(
        id,
        updateModuleDto,
        {
          new: true,
        },
      );
      if (!module) {
        throw new NotFoundError(`Module with id ${id} not found`);
      }
      return module;
    });
  }

  async remove(id: string) {
    return mongoErrorWrapper(async () => {
      const module = await this.moduleModel.findById(id).exec();
      if (!module) {
        throw new NotFoundError(`Course with id ${id} not found`);
      }

      const { parentCourse, parentModule, exercises, lessons, modules } =
        module;

      const exercisesPromises = exercises.map((exercise: ExerciseDocument) => {
        this.exerciseService.destroy(exercise._id);
      });

      const lessonsPromises = lessons.map((lesson: LessonDocument) => {
        this.lessonService.destroy(lesson._id);
      });

      const modulesPromises = modules.map((module: ModuleDocument) => {
        this.remove(module._id);
      });

      if (parentCourse && (parentCourse as any)._id) {
        const parent = await this.courseService.findOne(
          (parentCourse as any)._id,
        );
        await this.courseService.removeModule(parent, module);
      }

      if (parentModule && (parentModule as any)._id) {
        const parent = await this.findOne((parentModule as any)._id);
        await this.removeModule(parent, module);
      }

      await Promise.allSettled([
        ...exercisesPromises,
        ...lessonsPromises,
        ...modulesPromises,
      ]);

      return await module.delete();
    });
  }
}
