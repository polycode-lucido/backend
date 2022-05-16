import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allow } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from 'src/content/course/entities/course.schema';
import { ContentCompletionParent } from 'src/user-completion/schemas/content-completion-parent.schema';
import { ContentType } from 'src/user-completion/schemas/content-completion.schema';

export type CourseCompletionDocument = CourseCompletion & Document;

@Schema()
export class CourseCompletion extends ContentCompletionParent {
  type = ContentType.COURSE;

  @Allow()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Allow()
  @Prop()
  userId: string;

  @Allow()
  @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
  enrolledAt: Date;
}

export const CourseCompletionSchema =
  SchemaFactory.createForClass(CourseCompletion);
