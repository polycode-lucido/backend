import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseCompletionController } from './course-completion.controller';
import { CourseCompletionService } from './course-completion.service';
import {
  CourseCompletion,
  CourseCompletionSchema,
} from './entities/course-completion.schema';
import {
  ExerciseCompletion,
  ExerciseCompletionSchema,
} from './entities/exercise-completion.schema';
import {
  LessonCompletion,
  LessonCompletionSchema,
} from './entities/lesson-completion.schema';
import {
  ModuleCompletion,
  ModuleCompletionSchema,
} from './entities/module-completion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseCompletion.name, schema: CourseCompletionSchema },
      { name: ModuleCompletion.name, schema: ModuleCompletionSchema },
      { name: LessonCompletion.name, schema: LessonCompletionSchema },
      { name: ExerciseCompletion.name, schema: ExerciseCompletionSchema },
    ]),
  ],
  controllers: [CourseCompletionController],
  providers: [CourseCompletionService],
})
export class CourseCompletionModule {}
