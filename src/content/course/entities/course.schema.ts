import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exercise } from 'src/content/exercice/entities/exercise.schema';
import { Content } from 'src/content/models/content.class';
import { Parent } from 'src/content/models/parent.interface';
import * as mongoose from 'mongoose';
import { Lesson } from 'src/content/lesson/entities/lesson.schema';
import { Allow, IsDefined } from 'class-validator';

export type CourseDocument = Course & Document;

@Schema()
export class Course extends Content implements Parent {
  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Exercice' })
  exercises: Exercise[];

  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Lesson' })
  lessons: Lesson[];

  @IsDefined()
  @Prop()
  description: string;

  getChildren() {
    return [...this.exercises, ...this.lessons];
  }
}

export const CourseSchema = SchemaFactory.createForClass(Course);
