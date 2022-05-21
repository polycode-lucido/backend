import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allow, IsDefined } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from 'src/content/course/entities/course.schema';
import { Exercise } from 'src/content/exercise/entities/exercise.schema';
import { Lesson } from 'src/content/lesson/entities/lesson.schema';
import { Module } from 'src/content/module/entities/module.schema';
import {
  computeProgressRate,
  ContentCompletionParent,
} from 'src/user-completion/schemas/content-completion-parent.schema';
import { ContentType } from 'src/user-completion/schemas/content-completion.schema';
import { ExerciseCompletion } from './exercise-completion.schema';
import { LessonCompletion } from './lesson-completion.schema';
import { ModuleCompletion } from './module-completion.schema';

export type CourseCompletionDocument = CourseCompletion & Document;

@Schema()
export class CourseCompletion extends ContentCompletionParent {
  @Prop({ type: mongoose.Schema.Types.String, default: ContentType.COURSE })
  type = ContentType.COURSE;

  @IsDefined()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @IsDefined()
  @Prop()
  userId: string;

  @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
  enrolledAt: Date;

  @Allow()
  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  progressRate = 0;

  static populateChildren(
    course: CourseCompletionDocument,
    exercices: Exercise[],
    lessons: Lesson[],
    modules: Module[],
  ) {
    course.children = [];
    if (exercices) {
      course.children.push(
        ...exercices.map((exercise) => new ExerciseCompletion(exercise)),
      );
    }
    if (lessons) {
      course.children.push(
        ...lessons.map((lesson) => new LessonCompletion(lesson)),
      );
    }
    if (modules) {
      course.children.push(
        ...modules.map((module) => new ModuleCompletion(module)),
      );
    }
  }
}

export const CourseCompletionSchema =
  SchemaFactory.createForClass(CourseCompletion);

CourseCompletionSchema.index({ userId: 1, course: 1 }, { unique: true });
CourseCompletionSchema.pre('save', function (next) {
  computeProgressRate(this as any as CourseCompletion);
  this.markModified('children');
  next();
});
