import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { ExerciseModule } from './exercice/exercise.module';
import { LessonModule } from './lesson/lesson.module';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/polycode', {
      user: 'user',
      pass: 'password',
      logger: Logger.debug.bind(Logger),
      loggerLevel: 'debug',
    }),
    CourseModule,
    ExerciseModule,
    LessonModule,
    ModuleModule,
  ],
})
export class ContentModule {}
