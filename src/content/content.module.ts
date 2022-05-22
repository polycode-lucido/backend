import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { registerer, validationSchema } from './course/mongo.config';
import { ExerciseModule } from './exercise/exercise.module';
import { LessonModule } from './lesson/lesson.module';
import { ModuleModule } from './module/module.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [registerer],
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('mongo'),
      inject: [ConfigService],
    }),
    CourseModule,
    ExerciseModule,
    LessonModule,
    ModuleModule,
  ],
  exports: [CourseModule, ExerciseModule, LessonModule, ModuleModule],
})
export class ContentModule {}
