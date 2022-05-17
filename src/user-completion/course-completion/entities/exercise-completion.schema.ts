import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allow, IsDefined } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Exercise } from 'src/content/exercise/entities/exercise.schema';
import { RunLanguages, RunnerExecutionResults } from 'src/runner/runner.model';
import {
  ContentCompletion,
  ContentType,
} from 'src/user-completion/schemas/content-completion.schema';

export type ExerciseCompletionDocument = ExerciseCompletion & Document;

@Schema()
export class ExerciseCompletion extends ContentCompletion {
  @Prop({ type: mongoose.Schema.Types.String, default: ContentType.EXERCISE })
  type = ContentType.EXERCISE;

  @IsDefined()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Exercise' })
  exercise: Exercise;

  @Allow()
  @Prop()
  sourceCode: { runLanguage: RunLanguages; sourceCode: string }[] = [];

  @Allow()
  @Prop()
  sucessfulRun: {
    runLanguage: RunLanguages;
    result: RunnerExecutionResults;
  }[] = [];

  @Allow()
  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  completed = false;

  constructor(exercise: Exercise) {
    super();
    this.exercise = exercise;
  }
}

export const ExerciseCompletionSchema =
  SchemaFactory.createForClass(ExerciseCompletion);
