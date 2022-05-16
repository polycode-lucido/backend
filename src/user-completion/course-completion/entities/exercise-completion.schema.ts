import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allow } from 'class-validator';
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
  type = ContentType.EXERCISE;

  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Exercise' })
  exercise: Exercise;

  @Allow()
  @Prop()
  sourceCode: { runLanguage: RunLanguages; sourceCode: string }[];

  @Allow()
  @Prop()
  sucessfulRun: { runLanguage: RunLanguages; result: RunnerExecutionResults }[];

  @Allow()
  @Prop({ default: false })
  completed: boolean;

  isCompleted(): boolean {
    return this.completed;
  }

  progressRate(): number {
    return this.completed ? 100 : 0;
  }
}

export const ExerciseCompletionSchema =
  SchemaFactory.createForClass(ExerciseCompletion);
