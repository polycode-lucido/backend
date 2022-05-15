import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './entities/course.schema';
import { ExerciseModule } from '../exercise/exercise.module';
import { LessonModule } from '../lesson/lesson.module';
import { ModuleModule } from '../module/module.module';

@Module({
  imports: [
    forwardRef(() => ExerciseModule),
    forwardRef(() => LessonModule),
    forwardRef(() => ModuleModule),
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.pre(['findOne'], function (next) {
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
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
