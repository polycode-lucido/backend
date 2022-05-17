import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allow } from 'class-validator';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Module } from 'src/content/module/entities/module.schema';
import { ContentCompletionParent } from 'src/user-completion/schemas/content-completion-parent.schema';
import { ContentType } from 'src/user-completion/schemas/content-completion.schema';
import { Exercise } from 'src/content/exercise/entities/exercise.schema';
import { Lesson } from 'src/content/lesson/entities/lesson.schema';
import { ExerciseCompletion } from './exercise-completion.schema';
import { LessonCompletion } from './lesson-completion.schema';

export type ModuleCompletionDocument = ModuleCompletion & Document;

@Schema()
export class ModuleCompletion extends ContentCompletionParent {
  @Prop({ type: mongoose.Schema.Types.String, default: ContentType.MODULE })
  type = ContentType.MODULE;

  @Allow()
  @Prop()
  module: Module;

  progressRate = 0;

  constructor(module: Module) {
    super();
    this.module = module;
    this.populateChildren(module.exercises, module.lessons, module.modules);
  }

  populateChildren(
    exercices: Exercise[],
    lessons: Lesson[],
    modules: Module[],
  ) {
    this.children = [];
    if (exercices) {
      this.children.push(
        ...exercices.map((exercise) => new ExerciseCompletion(exercise)),
      );
    }
    if (lessons) {
      this.children.push(
        ...lessons.map((lesson) => new LessonCompletion(lesson)),
      );
    }
    if (modules) {
      this.children.push(
        ...modules.map((module) => new ModuleCompletion(module)),
      );
    }
  }
}

export const ModuleCompletionSchema =
  SchemaFactory.createForClass(ModuleCompletion);
