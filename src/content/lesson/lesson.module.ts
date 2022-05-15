import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './entities/lesson.schema';
import { ModuleModule } from '../module/module.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    ModuleModule,
    CourseModule,
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
