import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from '../course/course.module';
import { ExerciseModule } from '../exercise/exercise.module';
import { LessonModule } from '../lesson/lesson.module';
import {
  Module as PolycodeModule,
  ModuleSchema,
} from './entities/module.schema';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';

@Module({
  imports: [
    forwardRef(() => ExerciseModule),
    forwardRef(() => LessonModule),
    forwardRef(() => CourseModule),
    MongooseModule.forFeatureAsync([
      {
        name: PolycodeModule.name,
        useFactory: () => {
          const schema = ModuleSchema;
          schema.pre(['find', 'findOne'], function (next) {
            this.populate('modules');
            this.populate('lessons');
            this.populate('exercises');
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [ModuleService],
})
export class ModuleModule {}
