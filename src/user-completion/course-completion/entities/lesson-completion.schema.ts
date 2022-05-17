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
  @Prop({ type: mongoose.Schema.Types.String, default: ContentType.LESSON })
  type = ContentType.LESSON;

  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Lesson' })
  lesson: Lesson;

  @Allow()
  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  completed = false;

  constructor(lesson: Lesson) {
    super();
    this.lesson = lesson;
  }
}

export const LessonCompletionSchema =
  SchemaFactory.createForClass(LessonCompletion);
