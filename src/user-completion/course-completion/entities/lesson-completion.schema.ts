import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allow } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Lesson } from 'src/content/lesson/entities/lesson.schema';
import {
  ContentCompletion,
  ContentType,
} from 'src/user-completion/schemas/content-completion.schema';

export type LessonCompletionDocument = LessonCompletion & Document;

@Schema()
export class LessonCompletion extends ContentCompletion {
  type = ContentType.LESSON;

  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Lesson' })
  lesson: Lesson;

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

export const LessonCompletionSchema =
  SchemaFactory.createForClass(LessonCompletion);
