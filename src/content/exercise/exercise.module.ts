import { forwardRef, Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './entities/exercise.schema';
import { ModuleModule } from '../module/module.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    forwardRef(() => ModuleModule),
    forwardRef(() => CourseModule),
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
